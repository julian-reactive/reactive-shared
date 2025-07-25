import React from 'react';
interface AmountComponentProps {
    onPlus: (value: number) => void;
    onMinus: (value: number) => void;
    maxValue?: number;
    minValue?: number;
    initialValue?: number;
    value?: number;
    textWidth?: string;
    disabled?: boolean;
}
export declare const SharedAmount: React.FC<AmountComponentProps>;
export {};
