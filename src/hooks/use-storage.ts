import { useEffect, useState } from 'react'

// Utility to get a value from chrome.storage.local
export async function getStorage<T>(key: string): Promise<T | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      resolve(result[key] ?? null)
    })
  })
}

// Utility to set a value to chrome.storage.local
export async function setStorage<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => resolve())
  })
}

// React hook to use reactive storage
export function useStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)

  // Sync from chrome storage on mount
  useEffect(() => {
    getStorage<T>(key).then((storedValue) => {
      if (storedValue !== null) {
        setValue(storedValue)
      }
    })
  }, [key])

  // Listen for changes from other tabs/extensions
  useEffect(() => {
    const listener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string,
    ) => {
      if (areaName === 'local' && changes[key]) {
        setValue(changes[key].newValue)
      }
    }
    chrome.storage.onChanged.addListener(listener)
    return () => chrome.storage.onChanged.removeListener(listener)
  }, [key])

  // Save to chrome.storage.local whenever value changes
  const updateValue = (newValue: T) => {
    setValue(newValue)
    setStorage(key, newValue)
  }

  return [value, updateValue] as const
}
