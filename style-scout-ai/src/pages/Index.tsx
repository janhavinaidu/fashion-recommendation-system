import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ResultsSection, { Recommendation } from "@/components/ResultsSection";
import ModelInfoSidebar from "@/components/ModelInfoSidebar";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [results, setResults] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRecommend = async (file: File) => {
    setIsLoading(true);
    setResults([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/recommend", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API response was not ok");
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Prepend FastAPI local URL to the returned relative image URLs
      const fetchedResults: Recommendation[] = data.recommendations.map((item: any) => ({
        image_url: `http://localhost:8000${item.image_url}`,
        similarity_score: item.similarity_score,
        reason: item.reason,
        category: item.category,
      }));

      setResults(fetchedResults);
      toast.success(`Found ${fetchedResults.length} similar styles!`);
    } catch (error: any) {
      console.error("Recommendation error:", error);
      toast.error("Failed to get recommendations. Please try again. Make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindSimilar = async (imageUrl: string) => {
    setIsLoading(true);
    setResults([]);
    scrollToUpload();
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const filename = imageUrl.split('/').pop() || 'similar-item.jpg';
      const file = new File([blob], filename, { type: blob.type });
      
      // Simulate file upload logic then trigger search
      await handleRecommend(file);
    } catch (err) {
      console.error("Failed to load similar image:", err);
      toast.error("Failed to initiate search for similar item.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground tracking-tight">
              StyleAI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <button onClick={scrollToUpload} className="hover:text-foreground transition-colors duration-300">
              Upload
            </button>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              How it Works
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              About
            </a>
          </nav>
          <button className="px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-accent transition-colors duration-300">
            Sign In
          </button>
        </div>
      </header>

      <main>
        <HeroSection onTryNow={scrollToUpload} />
        <div ref={uploadRef}>
          <UploadSection onRecommend={handleRecommend} isLoading={isLoading} />
        </div>
        <ResultsSection results={results} onFindSimilar={handleFindSimilar} />
        <ModelInfoSidebar />
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-border/30 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-foreground">StyleAI</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Built with ResNet-50 · Cosine Similarity · Visual AI
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
