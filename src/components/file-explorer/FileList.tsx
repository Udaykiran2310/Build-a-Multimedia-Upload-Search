
"use client";

import type { FileItem } from '@/types';
import { FileCard } from './FileCard';
import { FolderOff } from 'lucide-react';

type FileListProps = {
  files: FileItem[];
  onDeleteFile: (fileId: string) => void;
};

export function FileList({ files, onDeleteFile }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/20">
        <FolderOff className="h-20 w-20 text-muted-foreground/50 mb-6" />
        <h3 className="text-2xl font-semibold text-muted-foreground">No Files Found</h3>
        <p className="text-muted-foreground mt-2">Upload some files to get started or try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onDelete={onDeleteFile} />
      ))}
    </div>
  );
}
