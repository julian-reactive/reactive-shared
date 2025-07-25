/** eslint-ignore  @typescript-eslint/no-unused-vars */
import React from 'react';
import { TypographyProps } from '@mui/material/Typography';
interface iReplace {
    [key: string]: string | number;
}
interface LangTranslationsProps {
    [key: string]: string | LangTranslationsProps;
}
export interface IntlProps extends TypographyProps {
    langKey: string;
    replace?: iReplace;
    transpileHTML?: boolean;
    noCache?: boolean;
    children?: React.ReactNode;
    component?: string;
}
/**
 * Function for set copies.
 * must provide the the copies(json) for this langcode:
 * {
 *  "bla": "lorem ipsum....stuff"
 * }
 * */
export declare const initLangCode: (newTranslations: LangTranslationsProps) => void;
export type OnlyTextProps = (langKey: string, replace?: iReplace, noCache?: boolean) => string;
/**
 * Function for get copy from translation json file
 * @param {string} langKey - key in translation json file
 * @param {object} replace - object for insert values in translation
 * @param {boolean} noCache - update copy in every render
 * */
export declare const onlyText: OnlyTextProps;
export declare const Intl: React.NamedExoticComponent<IntlProps>;
export default Intl;
