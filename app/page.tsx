import { MatrixRadarSection } from "@/components/MatrixRadarSection";
import { NavBar } from "@/components/NavBar";
import { PublicNewsFeed } from "@/components/PublicNewsFeed";
import { SettlementTicker } from "@/components/SettlementTicker";
import { SiteFooter } from "@/components/SiteFooter";
import { ThesisAndLandscape } from "@/components/ThesisAndLandscape";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <NavBar />
      <ThesisAndLandscape />
      <SettlementTicker />
      <MatrixRadarSection />
      <PublicNewsFeed />
      <SiteFooter />
    </div>
  );
}
