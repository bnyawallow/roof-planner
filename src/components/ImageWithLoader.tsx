import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  containerClassName, 
  className,
  src,
  alt,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-surface-container-low", containerClassName)}>
      <img
        className={cn(
          "w-full h-full transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        src={src}
        alt={alt || ""}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        {...props}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container-low text-on-surface-variant/50 pointer-events-none">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
    </div>
  );
};
