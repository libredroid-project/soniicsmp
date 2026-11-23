import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/site/wordmark";
import { SITE } from "@/lib/site-config";

/**
 * Minimal fixed header in the aesthetic.pub style: wordmark left,
 * a couple of ghost links and a single primary CTA right.
 */
export function SiteHeader() {
  return (
    <header className="bg-background/85 fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a href="#top" aria-label="SoniicSMP, back to top" className="flex items-center">
          <Wordmark className="text-lg font-semibold" />
        </a>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <a href="#ranks">Ranks</a>
          </Button>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <a href="#how-it-works">How it works</a>
          </Button>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <a href="#faq">FAQ</a>
          </Button>
          <Button asChild>
            <a href="#checkout" aria-label={`Buy a rank on the ${SITE.name} store`}>
              Buy a rank
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
