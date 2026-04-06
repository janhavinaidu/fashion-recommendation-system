import { Info, Cpu, Layers, GitBranch, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MODEL_INFO = [
  {
    icon: Cpu,
    label: "Architecture",
    value: "ResNet-50",
    tooltip: "Deep residual network with 50 layers, pre-trained on ImageNet for visual feature extraction.",
  },
  {
    icon: Layers,
    label: "Embeddings",
    value: "Feature Vectors",
    tooltip: "2048-dimensional feature vectors extracted from the penultimate layer of the network.",
  },
  {
    icon: GitBranch,
    label: "Similarity",
    value: "Cosine Distance",
    tooltip: "Measures the angle between feature vectors — smaller angle means higher visual similarity.",
  },
  {
    icon: Search,
    label: "Search",
    value: "K-Nearest Neighbors",
    tooltip: "Finds the K most similar items in the feature space based on distance metrics.",
  },
];

const ModelInfoSidebar = () => {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient-bg opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="badge-rose mb-6 inline-flex animate-fade-up">
            <Cpu className="w-3 h-3 mr-1.5" />
            Technology
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 animate-fade-up-delay-1">
            Under the <span className="italic text-gradient">Hood</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light animate-fade-up-delay-2">
            The AI pipeline powering your recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODEL_INFO.map((info, i) => {
            const Icon = info.icon;
            return (
              <div
                key={info.label}
                className={`glass-card-hover p-6 animate-fade-up-delay-${i}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200">
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-sm">
                      {info.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block mb-2">
                  {info.label}
                </span>
                <p className="text-foreground text-lg font-semibold">{info.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModelInfoSidebar;
