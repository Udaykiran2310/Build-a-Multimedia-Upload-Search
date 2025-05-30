
export type FileType = 'image' | 'video' | 'audio' | 'pdf' | 'archive' | 'document' | 'other';

export type FileItem = {
  id: string;
  name: string;
  type: FileType;
  size: string; // e.g., "1.2 MB"
  url: string; // actual file URL for download/full view
  previewUrl?: string; // for images, videos, audio
  uploadedAt: Date;
  tags?: string[];
  dataAiHint?: string; // For placeholder images
};
