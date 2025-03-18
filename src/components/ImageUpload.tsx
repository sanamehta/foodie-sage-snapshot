
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
}

const ImageUpload = ({ onImageSelected }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Pass the file to parent component
    onImageSelected(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div
        className={`drop-zone p-8 flex flex-col items-center justify-center min-h-[300px] ${
          isDragging ? 'drop-zone-active' : ''
        } ${preview ? 'bg-gray-50 dark:bg-gray-900/50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />

        {preview ? (
          <div className="w-full flex flex-col items-center">
            <motion.img
              src={preview}
              alt="Food preview"
              className="max-h-[300px] max-w-full rounded-lg object-contain img-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <p className="mt-4 text-sm text-gray-500">Image selected. Click to change.</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 mx-auto text-gray-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-2.25m-18 0V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5m-18 0h18M9 12l3 3m0 0l3-3m-3 3V5.25" 
                />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Upload a food image</h3>
            <p className="mb-4 text-sm text-gray-500">
              Drag and drop an image, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: JPEG, PNG, WebP
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ImageUpload;
