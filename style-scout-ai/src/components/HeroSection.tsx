import heroBg from "@/assets/hero-bg.jpg";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onTryNow: () => void;
}

const HeroSection = ({ onTryNow }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient-bg">
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-gold/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 rounded-full bg-rose/5 blur-3xl animate-float-delay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/30 blur-[100px]" />
      </div>

      {/* Floating fashion images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[12%] left-[8%] w-32 h-44 rounded-2xl overflow-hidden shadow-2xl rotate-[-8deg] animate-float opacity-40">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=200&h=280&fit=crop" alt="" className="w-full h-full object-cover" loading="lazy" width={200} height={280} />
        </div>
        <div className="absolute top-[18%] right-[10%] w-28 h-40 rounded-2xl overflow-hidden shadow-2xl rotate-[6deg] animate-float-delay opacity-40">
          <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=280&fit=crop" alt="" className="w-full h-full object-cover" loading="lazy" width={200} height={280} />
        </div>
        <div className="absolute bottom-[15%] left-[15%] w-24 h-36 rounded-2xl overflow-hidden shadow-2xl rotate-[10deg] animate-float opacity-30">
          <img src="https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=200&h=280&fit=crop" alt="" className="w-full h-full object-cover" loading="lazy" width={200} height={280} />
        </div>
        <div className="absolute bottom-[20%] right-[8%] w-28 h-40 rounded-2xl overflow-hidden shadow-2xl rotate-[-5deg] animate-float-delay opacity-35">
          <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=280&fit=crop" alt="" className="w-full h-full object-cover" loading="lazy" width={200} height={280} />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass-card mb-10">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-muted-foreground tracking-widest uppercase">
              Powered by Visual AI
            </span>
          </div>
        </div>

        <h1 className="animate-fade-up-delay-1 text-6xl md:text-8xl lg:text-9xl font-display font-semibold leading-[0.9] mb-8">
          <span className="text-foreground">Discover</span>
          <br />
          <span className="text-gradient italic">Your Style</span>
        </h1>

        <p className="animate-fade-up-delay-2 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed font-light">
          Upload any fashion image and our AI instantly finds
          the most visually similar styles for you.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onTryNow}
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-base font-semibold tracking-wide transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] hover:scale-105 active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative">Get Started</span>
            <svg
              className="relative w-5 h-5 transition-transform duration-500 group-hover:translate-x-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <button className="inline-flex items-center gap-2 px-8 py-5 text-muted-foreground text-base font-medium rounded-full hover:bg-secondary/60 transition-all duration-300">
            Learn More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="animate-fade-up-delay-4 mt-20 flex items-center justify-center gap-8 md:gap-16">
          {[
            { value: "50K+", label: "Styles Indexed" },
            { value: "98%", label: "Accuracy" },
            { value: "<2s", label: "Response Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-display font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up-delay-4">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
