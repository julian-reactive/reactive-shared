type GetLocalStorageValueProps = (key: string) => string;
type SetLocalStorageValueProps = (key: string, value: any) => void;
type ClearLocalStorageValueProps = (key: string) => void;
export declare const getLocalStorageValue: GetLocalStorageValueProps;
export declare const setLocalStorageValue: SetLocalStorageValueProps;
export declare const clearLocalStorageValue: ClearLocalStorageValueProps;
export {};
