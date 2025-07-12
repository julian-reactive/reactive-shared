export const ACCEPTED_FILE_TYPES = {
  IMAGES: 'IMAGES',
  DOCUMENTS: 'DOCUMENTS',
  ALL: 'ALL'
}

export const IMAGE_TYPES = {
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png',
  WEBP: 'image/webp',
  TIFF: 'image/tiff'
}

export const DOCUMENT_TYPES = {
  // Text Documents
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT: 'text/plain',
  RTF: 'application/rtf',
  ODT: 'application/vnd.oasis.opendocument.text',

  // Spreadsheets
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
  ODS: 'application/vnd.oasis.opendocument.spreadsheet'
}

export const isImageType = (type: string): boolean => {
  return Object.values(IMAGE_TYPES).includes(type)
}

export const isDocumentType = (type: string): boolean => {
  return Object.values(DOCUMENT_TYPES).includes(type)
}
