import { EntityProp, EntityIdProp, FileProps } from './hooks';
import { ACCEPTED_FILE_TYPES } from './constants';
interface SharedUploadFilesProps {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    entity: EntityProp;
    entityId?: EntityIdProp;
    type?: keyof typeof ACCEPTED_FILE_TYPES;
    onLoad: (files: FileProps[]) => void;
}
export declare const SharedUploadFiles: ({ multiple, maxSize, entity, entityId, type, onLoad }: SharedUploadFilesProps) => import("react/jsx-runtime").JSX.Element;
export {};
