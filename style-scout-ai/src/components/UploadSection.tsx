import { useState, useRef, useCallback } from "react";
import { Upload, ImageIcon, X, Sparkles, Camera } from "lucide-react";

interface UploadSectionProps {
  onRecommend: (file: File) => void;
  isLoading: boolean;
}

const LOADING_MESSAGES = [
  "Extracting visual features…",
  "Finding similar styles…",
  "Generating recommendations…",
];

const UploadSection = ({ onRecommend, isLoading }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const handleFile = useCallback((f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f?.type.startsWith("image/")) handleFile(f);
    },
    [handleFile]
  );

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleGenerate = () => {
    if (!file) return;
    setLoadingStep(0);
    intervalRef.current = setInterval(() => {
      setLoadingStep((s) => {
        if (s >= LOADING_MESSAGES.length - 1) {
          clearInterval(intervalRef.current);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    onRecommend(file);
  };

  return (
    <section id="upload" className="py-28 px-6 relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--warm)),transparent_60%),radial-gradient(circle_at_70%_80%,hsl(var(--cream)),transparent_50%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="animate-fade-up">
          <span className="badge-rose mb-6 inline-flex">
            <Camera className="w-3 h-3 mr-1.5" />
            Upload
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-4 animate-fade-up-delay-1">
          Show Us Your
          <span className="italic text-gradient"> Inspiration</span>
        </h2>
        <p className="text-muted-foreground mb-14 text-lg font-light animate-fade-up-delay-2">
          Drop a fashion image and let AI find your next favorite piece
        </p>

        {!preview ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`animate-fade-up-delay-3 group relative cursor-pointer transition-all duration-500 ${
              isDragging ? "scale-[1.02]" : ""
            }`}
          >
            <div className={`gradient-border p-16 transition-all duration-500 ${
              isDragging ? "bg-warm" : "hover:bg-secondary/30"
            }`}>
              <div className="flex flex-col items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-accent">
                    <Upload className="w-8 h-8 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-gold-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-foreground font-semibold text-lg mb-1.5">
                    Drag & drop your image
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse · JPG, PNG, WEBP supported
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-taupe">
                  <span className="px-3 py-1 rounded-full bg-secondary">Max 10MB</span>
                  <span className="px-3 py-1 rounded-full bg-secondary">High quality preferred</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up glass-card p-8">
            <div className="relative inline-block group">
              <div className="rounded-2xl overflow-hidden pin-shadow">
                <img
                  src={preview}
                  alt="Uploaded fashion item"
                  className="max-h-96 object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <button
                onClick={clearFile}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 hover:bg-destructive transition-all duration-300 shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="w-4 h-4" />
              <span className="truncate max-w-[200px]">{file?.name}</span>
              <span className="text-taupe">·</span>
              <span className="text-taupe">{file ? (file.size / 1024).toFixed(0) + " KB" : ""}</span>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {preview && (
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="mt-10 group relative inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-base font-semibold tracking-wide transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] hover:scale-105 active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none animate-fade-up"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-foreground"
                      style={{
                        animation: `pulse-dot 1.2s ${i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
                <span>{LOADING_MESSAGES[loadingStep]}</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default UploadSection;
