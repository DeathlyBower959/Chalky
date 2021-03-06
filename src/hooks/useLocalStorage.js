import { useEffect, useState } from 'react'

const PREFIX = 'chalky-app-'

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export function deleteItem(key) {
  const prefixedKey = PREFIX + key

  if (localStorage.getItem(prefixedKey) != null || localStorage.getItem(prefixedKey) != undefined) {
    localStorage.removeItem(prefixedKey);
  }
}