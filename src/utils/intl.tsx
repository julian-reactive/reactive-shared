/** eslint-ignore  @typescript-eslint/no-unused-vars */
// Libraries
import React from 'react'
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import each from 'lodash/each'
import isEmpty from 'lodash/isEmpty'

// Material Components
import Typography, { TypographyProps } from '@mui/material/Typography'

interface iReplace {
  [key: string]: string
}

interface LangTranslationsProps {
  [key: string]: string | LangTranslationsProps
}

export interface IntlProps extends TypographyProps {
  langKey: string
  replace?: iReplace
  transpileHTML?: boolean
  noCache?: boolean
  children?: React.ReactNode
  component?: string
}

const replacedCached: iReplace = {}

let translations: LangTranslationsProps

const getKey = (key: string): string => {
  if (isEmpty(translations)) return 'NO_LANGCODE_DEFINED'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return get(translations, key, `##${key}##`)
}

const replaceRegex = (key: string) => new RegExp(`\\$\\{${key}\\}`, "g") // eslint-disable-line

/**
 * Function for set copies.
 * must provide the the copies(json) for this langcode:
 * {
 *  "bla": "lorem ipsum....stuff"
 * }
 * */
export const initLangCode = (newTranslations: LangTranslationsProps): void => {
  translations = newTranslations
}

type OnlyTextProps = (langKey: string, replace?: iReplace, noCache?: boolean) => string

/**
 * Function for get copy from translation json file
 * @param {string} langKey - key in translation json file
 * @param {object} replace - object for insert values in translation
 * @param {boolean} noCache - update copy in every render
 * */
export const onlyText: OnlyTextProps = (langKey, replace = undefined, noCache = false) => {
  let text = getKey(langKey)

  if (replace == null) {
    return text
  }

  if (!isObject(replace)) {
    throw new Error(`Intl Error ->> Bad Replace structure in ---> ${langKey}`)
  }

  if (replacedCached[langKey] !== undefined) {
    return replacedCached[langKey]
  }

  each(replace, (value: string, key: string) => {
    const regex = replaceRegex(key.toString())

    if (!regex.test(text)) {
      throw new Error(`Intl Error ->> key -- ${key} -- not defined translation in ---> ${langKey}`)
    }

    text = text.replace(replaceRegex(key), value)
  }
  )

  if (!noCache) {
    replacedCached[langKey] = text
  }

  return text
}

const IntlContainer: React.FC<IntlProps> = ({ langKey, replace, transpileHTML = false, noCache = false, ...props }) => {
  if (transpileHTML) {
    return (
      <Typography
        {...props}
        data-langkey={langKey}
        dangerouslySetInnerHTML={{ __html: onlyText(langKey, replace, noCache) }}
      />
    )
  }

  return (
    <Typography {...props} data-langkey={langKey}>
      {onlyText(langKey, replace, noCache)}
    </Typography>
  )
}

export const Intl: React.NamedExoticComponent<IntlProps> = React.memo(IntlContainer)

export default Intl
