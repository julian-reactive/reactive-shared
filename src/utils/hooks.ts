import { useRef, useEffect, useMemo } from 'react'

import { onlyText } from '../utils/intl'

export const usePreviousValue = <T>(value: T): T => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current!
}

export const useLabel = (label: string | (() => string)): string => {
  const renderLabel = useMemo(() => {
    if (typeof label === 'string') {
      const text = onlyText(label)

      if (typeof text !== 'string') {
        throw new Error(`label ${label.toString()} is not a string`)
      }

      if (text.startsWith('#') && text.endsWith('#')) {
        return text.slice(2, -2)
      }
      return text
    }

    if (typeof label === 'function') return label()
    return '-'
  }, [label])

  return renderLabel
}
