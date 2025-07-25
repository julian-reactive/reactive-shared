type FormatToNumberProps = (n: string | number) => string;
type FormatToMoneyProps = (value: string | number, spacing?: boolean) => string;
type FormatToPhoneProps = (text: string) => string;
export declare const formatToNumber: FormatToNumberProps;
export declare const formatToMoney: FormatToMoneyProps;
export declare const formatToPhone: FormatToPhoneProps;
export {};
