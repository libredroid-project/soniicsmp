import { NextResponse } from "next/server";

// =========================================================================
// SoniicSMP Store — Tip4Serv catalog API
// =========================================================================
// Server-side fetch of the live Tip4Serv shop (soniic.tip4serv.com) and
// parsing of the product cards into structured JSON. The frontend uses this
// to render the REAL live catalog (with live prices, discounts, images and
// perks) inside our Kodanetwork-style design — "payment directly over the
// API".
//
// Payment itself still happens on Tip4Serv's PCI-compliant checkout (the
// only way to legally process cards). Each product's `productUrl` deep-links
// to the Tip4Serv product page where Stripe / PayPal checkout completes.
//
// We refresh every 5 minutes server-side to keep prices/discounts in sync.
// =========================================================================

export const revalidate = 300; // 5 minutes ISR

export interface Tip4ServProduct {
  slug: string;
  title: string;
  productUrl: string;
  imageUrl: string | null;
  newPrice: string | null;
  oldPrice: string | null;
  discount: string | null;
  descriptionHtml: string;
  perks: string[];
  productId: string | null;
  fetchedAt: string;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

/**
 * Parse all `sc-card-product` blocks out of the Tip4Serv shop HTML.
 * The structure is predictable, so regex per-card is safe here.
 */
function parseProducts(html: string, shopOrigin: string): Tip4ServProduct[] {
  const products: Tip4ServProduct[] = [];

  // Split on the product card container boundary. Each chunk is one card.
  const chunks = html.split(/product-card-container/);
  for (let i = 1; i < chunks.length; i++) {
    const chunk = chunks[i] ?? "";

    const slugMatch = chunk.match(/data-slug="([^"]+)"/);
    const titleMatch = chunk.match(/<h5 class="style2">([^<]+)<\/h5>/);
    const urlMatch = chunk.match(/href="\/product\/([^"]+)"/);
    const imgMatch = chunk.match(/<img[^>]*src="([^"]+)"[^>]*alt="Image"/);
    const oldPriceMatch = chunk.match(
      /<strike class="old-price">([^<]+)<\/strike>/,
    );
    const newPriceMatch = chunk.match(
      /<span class="new_price[^"]*">([^<]+)<\/span>/,
    );
    const discountMatch = chunk.match(/<div class="discounted">([^<]+)<\/div>/);
    const productIdMatch = chunk.match(/data-product-id="([^"]+)"/);

    const descIdx = chunk.indexOf("card-product-description");
    let descHtml = "";
    let perks: string[] = [];
    if (descIdx >= 0) {
      const tail = chunk.slice(descIdx);
      const endIdx = tail.indexOf("product-show-more");
      descHtml = endIdx >= 0 ? tail.slice(0, endIdx) : tail;
      perks = Array.from(descHtml.matchAll(/<li>([\s\S]*?)<\/li>/g))
        .map((m) => decodeEntities(stripTags(m[1])))
        .filter((p) => p.length > 0);
      const introMatch = descHtml.match(/<p><b>([\s\S]*?)<\/b><\/p>/);
      if (introMatch) {
        const intro = decodeEntities(stripTags(introMatch[1]));
        if (intro && !perks.includes(intro)) {
          perks.unshift(intro);
        }
      }
    }

    const slug = slugMatch ? slugMatch[1] : urlMatch ? urlMatch[1] : null;
    if (!slug) continue;

    products.push({
      slug,
      title: titleMatch ? decodeEntities(titleMatch[1]) : slug,
      productUrl: `${shopOrigin}/product/${slug}`,
      imageUrl: imgMatch ? imgMatch[1] : null,
      newPrice: newPriceMatch ? newPriceMatch[1].trim() : null,
      oldPrice: oldPriceMatch ? oldPriceMatch[1].trim() : null,
      discount: discountMatch ? discountMatch[1].trim() : null,
      descriptionHtml: descHtml,
      perks,
      productId: productIdMatch ? productIdMatch[1] : null,
      fetchedAt: new Date().toISOString(),
    });
  }

  return products;
}

export async function GET() {
  const shopOrigin = "https://soniic.tip4serv.com";
  const shopUrl = `${shopOrigin}/`;

  try {
    const res = await fetch(shopUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `Tip4Serv returned HTTP ${res.status}`,
          shopUrl,
          products: [],
        },
        { status: 502 },
      );
    }

    const html = await res.text();
    const products = parseProducts(html, shopOrigin);

    if (products.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "No products parsed from Tip4Serv shop HTML",
          shopUrl,
          htmlLength: html.length,
          products: [],
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      shopUrl,
      shopOrigin,
      count: products.length,
      products,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Unknown error",
        shopUrl,
        products: [],
      },
      { status: 500 },
    );
  }
}
