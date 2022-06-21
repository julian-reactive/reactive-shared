type GetLocalStorageValueProps = (key: string) => string
type SetLocalStorageValueProps = (key: string, value: any) => void
type ClearLocalStorageValueProps = (key: string) => void

interface IStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

const storage: IStorage = window.localStorage

export const getLocalStorageValue: GetLocalStorageValueProps = (key) => {
  const item = storage.getItem(`fs_${key}`)

  if (item !== null) return JSON.parse(item)

  return ''
}

export const setLocalStorageValue: SetLocalStorageValueProps = (key, value) => {
  storage.setItem(`fs_${key}`, JSON.stringify(value))
}

export const clearLocalStorageValue: ClearLocalStorageValueProps = (key) => {
  storage.removeItem(`fs_${key}`)
}
