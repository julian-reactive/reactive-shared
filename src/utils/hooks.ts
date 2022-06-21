import { useRef, useEffect, useMemo } from 'react'

import { onlyText } from '../utils/intl'

export const usePreviousValue = <T extends undefined>(value: T): T | undefined => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const useLabel = (label: string | (() => string)): string => {
  const renderLabel = useMemo(() => {
    if (typeof label === 'string') return onlyText(label)
    if (typeof label === 'function') return label()
    return '-'
  }, [label])

  return renderLabel
}
