type FormatToNumberProps = (n: string | number) => string
type FormatToMoneyProps = (value: string | number, spacing?: boolean) => string
type FormatToPhoneProps = (text: string) => string

export const formatToNumber: FormatToNumberProps = n => {
  const fixed = Number(n) === n && n % 1 !== 0
    ? 2
    : 0
  return Number(n)
    .toFixed(fixed)
    .replace(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1.'
    )
}

export const formatToMoney: FormatToMoneyProps = (value, spacing = true) => `$${spacing
  ? ' '
  : ''}${formatToNumber(value)}`

export const formatToPhone: FormatToPhoneProps = (text = '') => {
  const t1 = text.slice(0, 3)
  const t2 = text.slice(3, 6)
  const t3 = text.slice(6)

  return `${t1} ${t2} ${t3}`
}
