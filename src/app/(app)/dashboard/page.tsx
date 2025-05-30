
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { FileList } from '@/components/file-explorer/FileList';
import { FileUploadDialog } from '@/components/file-explorer/FileUploadDialog';
import { Input } from '@/components/ui/input';
import type { FileItem } from '@/types';
import { Search } from 'lucide-react';

const initialMockFiles: FileItem[] = [
  { id: '1', name: 'Vacation Photo.jpg', type: 'image', size: '2.3 MB', url: 'https://placehold.co/1200x800.png', previewUrl: 'https://placehold.co/600x400.png', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), tags: ['travel', 'beach'], dataAiHint: 'beach landscape' },
  { id: '2', name: 'Project Proposal.pdf', type: 'pdf', size: '1.1 MB', url: '#', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), tags: ['work', 'important'] , dataAiHint: 'document paper' },
  { id: '3', name: 'Product Demo.mp4', type: 'video', size: '15.7 MB', url: 'https://placehold.co/static/videos/video-placeholder.mp4', previewUrl: 'https://placehold.co/static/videos/video-placeholder.mp4', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), tags: ['marketing', 'product'], dataAiHint: 'video play' },
  { id: '4', name: 'Company Report Q3.docx', type: 'document', size: '0.8 MB', url: '#', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), tags: ['report', 'finance'], dataAiHint: 'document analysis' },
  { id: '5', name: 'Website Assets.zip', type: 'archive', size: '33.2 MB', url: '#', uploadedAt: new Date(Date.now() - 1000 * 60 * 30), tags: ['design', 'web'], dataAiHint: 'zip archive' },
  { id: '6', name: 'Podcast Episode 12.mp3', type: 'audio', size: '25.1 MB', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', previewUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), tags: ['podcast', 'interview'], dataAiHint: 'audio wave' },
  { id: '7', name: 'Nature Scenery.png', type: 'image', size: '4.5 MB', url: 'https://placehold.co/1024x768.png', previewUrl: 'https://placehold.co/400x300.png', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), tags: ['nature', 'scenery', 'wallpaper'], dataAiHint: 'mountain forest' },
  { id: '8', name: 'Tutorial Video.webm', type: 'video', size: '8.2 MB', url: 'https://placehold.co/static/videos/video-placeholder.mp4', previewUrl: 'https://placehold.co/static/videos/video-placeholder.mp4', uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), tags: ['education', 'tutorial'], dataAiHint: 'learning computer' },
];


export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate fetching initial files
    const timer = setTimeout(() => {
      setFiles(initialMockFiles);
      setIsLoading(false);
    }, 500); // Short delay to show loading state
    return () => clearTimeout(timer);
  }, []);


  const handleFileUpload = (newFile: FileItem) => {
    setFiles((prevFiles) => [newFile, ...prevFiles]);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const filteredFiles = useMemo(() => {
    if (!searchTerm) return files;
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (file.tags && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [files, searchTerm]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:max-w-sm">
             <div className="h-10 bg-muted rounded-md animate-pulse w-full"></div>
          </div>
           <div className="h-10 bg-muted rounded-md animate-pulse w-32"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
              <div className="h-32 w-full bg-muted rounded-t-md"></div>
              <div className="p-4 space-y-2">
                <div className="h-5 w-3/4 bg-muted rounded"></div>
                <div className="h-3 w-1/2 bg-muted rounded"></div>
              </div>
              <div className="p-4 pt-0 flex justify-between items-center">
                <div className="h-8 w-24 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files by name or tag..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FileUploadDialog onFileUpload={handleFileUpload} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">My Files</h2>
        <FileList files={filteredFiles} onDeleteFile={handleDeleteFile} />
      </div>
    </div>
  );
}
