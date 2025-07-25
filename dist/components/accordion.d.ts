import React from 'react';
import { AccordionProps } from '@mui/material/Accordion';
interface ItemsProps extends AccordionProps {
    /**
       * Array of {name, children}
       *
       * @param {string} name: title of accordion tab
       * @param {ReactElement} children: inherited component. will be inside of accordion tab
       */
    name: string;
}
export type SharedAccordionProps = {
    items?: ItemsProps[];
} | null;
export declare const SharedAccordion: React.MemoExoticComponent<React.FC<SharedAccordionProps>>;
export {};
