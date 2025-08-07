export type EntityProp = string;
export type EntityIdProp = string | number | undefined;
export interface FileProps {
    id: string;
    name: string;
    size: number;
    content_type: string;
}
export declare const useHandleFiles: ({ entity, entityId, targetId }: {
    entity: EntityProp;
    entityId: EntityIdProp;
    targetId: string;
}) => {
    files: FileProps[] | undefined;
    isLoading: boolean;
    error: Error | null;
    postFiles: import("@tanstack/react-query").UseMutateFunction<import("axios").AxiosResponse<any, any>, Error, File[], unknown>;
    removeFile: import("@tanstack/react-query").UseMutateFunction<import("axios").AxiosResponse<any, any>, Error, string, unknown>;
};
