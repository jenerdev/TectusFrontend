export interface FileAttachment {
  file: File;
  expiry?: string;
}

export interface FileUploaderProps {
  files: FileAttachment[];
  onFileUpload: (file: File) => void;
  onFileRemove: (index: number) => void;
  onExpiryChange?: (index: number, newExpiry: string) => void;
  button: React.ReactNode;
  maxFiles?: number;
  // Block right away
  accept?: AcceptType | AcceptType[];
  // Can select any file but validate after selection
  validTypes?: AcceptType | AcceptType[];
  onInvalidFile?: (file: File) => void; // 👈 new prop
  isSubmitted?: boolean;
  disabled?: boolean;
}

export type CommonFileExtension =
  | '.jpg'
  | '.jpeg'
  | '.png'
  | '.gif'
  | '.webp'
  | '.pdf'
  | '.doc'
  | '.docx'
  | '.xls'
  | '.xlsx'
  | '.txt'
  | '.csv';

export type CommonMimeType =
  | 'image/*'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'text/plain'
  | 'text/csv';

export type AcceptType = string | CommonFileExtension | CommonMimeType;
