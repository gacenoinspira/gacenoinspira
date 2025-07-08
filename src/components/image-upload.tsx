"use client";

import { ChangeEvent, useRef, useState } from 'react';
import styles from './image-upload.module.css';

interface ImageUploadProps {
  onUpload: (files: FileList) => void;
  multiple?: boolean;
  label?: string;
  className?: string;
}

export function ImageUpload({ onUpload, multiple = false, label, className = '' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onUpload(e.dataTransfer.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      className={`${styles.uploadContainer} ${isDragging ? styles.dragging : ''} ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.fileInput}
        accept="image/*"
        multiple={multiple}
      />
      <div className={styles.uploadContent}>
        <p>{label || (multiple ? 'Arrastra y suelta imágenes o haz clic para seleccionar' : 'Arrastra y suelta una imagen o haz clic para seleccionar')}</p>
        <span className={styles.uploadHint}>
          {multiple ? 'Puedes seleccionar múltiples imágenes' : 'Solo se permite una imagen'}
        </span>
      </div>
    </div>
  );
}
