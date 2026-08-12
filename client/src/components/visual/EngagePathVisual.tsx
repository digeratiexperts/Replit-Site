import type { VisualStill } from "@/lib/visualAssets";
import { VisualStage } from "@/components/visual/VisualStage";

type EngagePathVisualProps = {
  still: VisualStill | undefined;
  alt: string;
};

/** Path-card bleed — same VisualStage as section editorials. */
export function EngagePathVisual({ still, alt }: EngagePathVisualProps) {
  return <VisualStage still={still} alt={alt} layout="card" />;
}
