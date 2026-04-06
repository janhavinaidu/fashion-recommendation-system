import { ExternalLink, Heart, Bookmark } from "lucide-react";
import { useState } from "react";

export interface Recommendation {
  image_url: string;
  similarity_score: number;
  reason?: string;
  category?: string;
}

interface ResultsSectionProps {
  results: Recommendation[];
  onFindSimilar: (imageUrl: string) => void;
}

const CARD_HEIGHTS = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]"];

const RecommendationCard = ({
  item,
  index,
  onFindSimilar
}: {
  item: Recommendation;
  index: number;
  onFindSimilar: (imageUrl: string) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const matchPercent = Math.round(item.similarity_score * 100);

  // Fallback to "fashion item" if category is missing
  const searchCategory = item.category || "fashion item";

  return (
    <div
      className={`group glass-card-hover overflow-hidden animate-fade-up-delay-${index}`}
    >
      <div className={`relative ${CARD_HEIGHTS[index % CARD_HEIGHTS.length]} overflow-hidden`}>
        <img
          src={item.image_url}
          alt={`Recommendation ${index + 1}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Match badge */}
        <div className="absolute top-3 left-3">
          <span className="badge-match">{matchPercent}%</span>
        </div>

        {/* Action buttons - appear on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              liked ? "bg-rose text-primary-foreground" : "bg-card/70 text-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              saved ? "bg-gold text-primary-foreground" : "bg-card/70 text-foreground"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Bottom info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFindSimilar(item.image_url);
            }}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card/80 backdrop-blur-md text-foreground text-sm font-medium hover:bg-card transition-colors duration-200 cursor-pointer"
          >
            🔍 Find Similar Items
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Style #{index + 1}</span>
          <span className="text-xs text-muted-foreground">{matchPercent}% similar</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${matchPercent}%`,
              background: `linear-gradient(90deg, hsl(var(--gold)), hsl(var(--rose)))`,
            }}
          />
        </div>
        {item.reason && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3" title={item.reason}>
            {item.reason}
          </p>
        )}
      </div>
    </div>
  );
};

const ResultsSection = ({ results, onFindSimilar }: ResultsSectionProps) => {
  if (results.length === 0) return null;

  return (
    <section className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.5),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="badge-match mb-6 inline-flex animate-fade-up">
            {results.length} Results
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 animate-fade-up-delay-1">
            Styles We <span className="italic text-gradient">Found</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light animate-fade-up-delay-2">
            Curated picks based on visual similarity
          </p>
        </div>

        {/* Pinterest-style staggered grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 gap-5 space-y-5">
          {results.map((item, index) => (
            <div key={index} className="break-inside-avoid">
              <RecommendationCard item={item} index={index} onFindSimilar={onFindSimilar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
