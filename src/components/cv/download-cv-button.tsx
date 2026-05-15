"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadCVButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

export const DownloadCVButton = ({
  variant = "outline",
  size = "lg",
  className,
}: DownloadCVButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/cv/generate");
      if (!response.ok) throw new Error("Failed to generate CV");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "cv-parfait-bashombe.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CV download failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleDownload}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Download className="mr-2 h-5 w-5" />
      )}
      {isLoading ? "Generating CV..." : "Download CV"}
    </Button>
  );
};
