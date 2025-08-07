export type TypeSeverity = 'error' | 'info' | 'success' | 'warning';
export type TypeSnackBar = string | {
    message: string;
    severity: TypeSeverity;
} | undefined;
