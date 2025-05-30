
"use client";

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, FileText } from 'lucide-react';
import type { FileItem } from '@/types';

type FileUploadDialogProps = {
  onFileUpload: (file: FileItem) => void;
};

export function FileUploadDialog({ onFileUpload }: FileUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const getFileType = (fileName: string): FileItem['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (!extension) return 'other';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) return 'image';
    if (['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'aac', 'flac'].includes(extension)) return 'audio';
    if (extension === 'pdf') return 'pdf';
    if (['zip', 'rar', 'tar', 'gz'].includes(extension)) return 'archive';
    if (['doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) return 'document';
    return 'other';
  };
  
  const getDataAiHintForFileType = (type: FileItem['type']): string => {
    switch (type) {
      case 'image': return 'photo gallery';
      case 'video': return 'movie film';
      case 'audio': return 'music sound';
      case 'pdf': return 'document report';
      case 'archive': return 'zip folder';
      case 'document': return 'text paper';
      default: return 'file data';
    }
  };


  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a file to upload.',
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newFile: FileItem = {
      id: crypto.randomUUID(),
      name: selectedFile.name,
      type: getFileType(selectedFile.name),
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`,
      url: URL.createObjectURL(selectedFile), // Use blob URL for local preview
      previewUrl: ['image', 'video', 'audio'].includes(getFileType(selectedFile.name)) ? URL.createObjectURL(selectedFile) : undefined,
      uploadedAt: new Date(),
      tags: ['new', selectedFile.type],
      dataAiHint: getDataAiHintForFileType(getFileType(selectedFile.name)),
    };

    onFileUpload(newFile);
    setIsUploading(false);
    setSelectedFile(null);
    setIsOpen(false); // Close dialog on successful upload
    toast({
      title: 'File Uploaded',
      description: `${selectedFile.name} has been uploaded successfully.`,
    });
  }, [selectedFile, onFileUpload, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UploadCloud className="h-5 w-5" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Upload New File</DialogTitle>
          <DialogDescription>
            Select a file from your device to add to your File Explorer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="file-upload" className="sr-only">Choose file</Label>
            <Input id="file-upload" type="file" onChange={handleFileChange} className="cursor-pointer file:font-semibold file:text-primary file:bg-primary-foreground hover:file:bg-accent"/>
          </div>
          {selectedFile && (
            <div className="flex items-center space-x-3 p-3 border rounded-md bg-muted/50">
              <FileText className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {`${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB`}
                </p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setSelectedFile(null)}>Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
