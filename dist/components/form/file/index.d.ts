import { FileProp } from './fileRow';
import { BuildInputProps } from '../sharedTypes';
interface SharedUploadFilesProps extends BuildInputProps {
    uploadedFiles?: FileProp[];
    disableUpload?: boolean;
}
export declare const SharedUploadFiles: ({ renderProps, inputProps, uploadedFiles, disableUpload }: SharedUploadFilesProps) => import("react/jsx-runtime").JSX.Element;
export default SharedUploadFiles;
