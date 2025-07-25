import React from 'react';
import Image from 'next/image';
import { useImageUpload } from '@/hooks/use-image-upload';
import { Button } from '@/components/ui/button';
import { X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageChange?: (url: string | null) => void;
  className?: string;
}

export function ImageUpload({ onImageChange, className = '' }: ImageUploadProps) {
  const { 
    previewUrl, 
    fileInputRef, 
    handleThumbnailClick, 
    handleFileChange,
    handleRemove 
  } = useImageUpload({
    onUpload: (url) => onImageChange?.(url)
  });

  const removeImage = () => {
    handleRemove();
    onImageChange?.(null);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl ? (
        <div className="relative overflow-hidden rounded-md border border-border">
          <Image 
            src={previewUrl} 
            alt="Uploaded image" 
            width={400}
            height={160}
            className="h-40 w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="h-40 w-full flex flex-col items-center justify-center gap-2 border-dashed"
          onClick={handleThumbnailClick}
        >
          <div className="rounded-md bg-muted p-2">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-sm font-medium">
            Click to upload product image
          </div>
          <div className="text-xs text-muted-foreground">
            SVG, PNG, JPG or GIF (max. 2MB)
          </div>
        </Button>
      )}
    </div>
  );
} 
