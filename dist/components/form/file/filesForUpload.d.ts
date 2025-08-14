import { FileProp } from './sharedTypes';
interface FilesForUploadProps {
    files: (File | FileProp)[];
    onRemoveFile: (idx: number) => void;
}
declare const FilesForUpload: ({ files, onRemoveFile }: FilesForUploadProps) => import("react/jsx-runtime").JSX.Element[];
export default FilesForUpload;
