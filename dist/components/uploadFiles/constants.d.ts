export declare const ACCEPTED_FILE_TYPES: {
    IMAGES: string;
    DOCUMENTS: string;
    ALL: string;
};
export declare const IMAGE_TYPES: {
    JPEG: string;
    JPG: string;
    PNG: string;
    WEBP: string;
    TIFF: string;
};
export declare const DOCUMENT_TYPES: {
    PDF: string;
    DOC: string;
    DOCX: string;
    TXT: string;
    RTF: string;
    ODT: string;
    XLS: string;
    XLSX: string;
    CSV: string;
    ODS: string;
};
export declare const isImageType: (type: string) => boolean;
export declare const isDocumentType: (type: string) => boolean;
