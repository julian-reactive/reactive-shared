import { FileProps } from './hooks';
interface FileRowProps {
    file: FileProps;
    handleRemoveFile: () => void;
}
declare const FileRow: ({ file, handleRemoveFile }: FileRowProps) => import("react/jsx-runtime").JSX.Element;
export default FileRow;
