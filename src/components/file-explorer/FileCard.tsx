
"use client";

import type { FileItem, FileType } from '@/types';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  File as FileIcon,
  Download,
  Trash2,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

type FileCardProps = {
  file: FileItem;
  onDelete: (fileId: string) => void;
};

const FileTypeIcon = ({ type, className }: { type: FileType; className?: string }) => {
  const props = { className: cn("h-10 w-10 text-muted-foreground", className) };
  switch (type) {
    case 'image':
      return <FileImage {...props} />;
    case 'video':
      return <FileVideo {...props} />;
    case 'audio':
      return <FileAudio {...props} />;
    case 'pdf':
      return <FileText {...props} />;
    case 'archive':
      return <FileArchive {...props} />;
    case 'document':
      return <FileText {...props} />;
    default:
      return <FileIcon {...props} />;
  }
};

export function FileCard({ file, onDelete }: FileCardProps) {
  const renderPreview = () => {
    switch (file.type) {
      case 'image':
        return (
          <div className="aspect-video w-full overflow-hidden rounded-t-md relative">
            <Image
              src={file.previewUrl || file.url || `https://placehold.co/300x200.png?text=${file.name}`}
              alt={file.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={file.dataAiHint || "abstract"}
            />
          </div>
        );
      case 'video':
        return (
          <div className="aspect-video w-full bg-black rounded-t-md flex items-center justify-center">
             {file.previewUrl || file.url ? (
                <video src={file.previewUrl || file.url} controls className="w-full h-full object-contain" />
             ) : (
                <FileVideo className="h-16 w-16 text-muted-foreground" />
             )}
          </div>
        );
      case 'audio':
        return (
          <div className="h-32 w-full bg-muted rounded-t-md flex flex-col items-center justify-center p-4 space-y-2">
            <FileAudio className="h-12 w-12 text-primary" />
             {file.previewUrl || file.url ? (
                <audio src={file.previewUrl || file.url} controls className="w-full" />
             ) : (
                <p className="text-sm text-muted-foreground">No preview</p>
             )}
          </div>
        );
      default:
        return (
          <div className="h-32 w-full bg-muted rounded-t-md flex items-center justify-center">
            <FileTypeIcon type={file.type} className="h-16 w-16" />
          </div>
        );
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {renderPreview()}
      <CardHeader className="p-4 flex-grow">
        <CardTitle className="text-lg truncate" title={file.name}>{file.name}</CardTitle>
        <CardDescription className="text-xs">
          {file.size} &bull; {formatDistanceToNow(new Date(file.uploadedAt), { addSuffix: true })}
        </CardDescription>
        {file.tags && file.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {file.tags.slice(0,3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button variant="outline" size="sm" asChild>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.type === 'pdf' || file.type === 'document' ? <ExternalLink className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
            {file.type === 'pdf' || file.type === 'document' ? 'Open' : 'Download'}
          </a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDelete(file.id)}>
              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
