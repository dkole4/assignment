import { useState } from 'react'


export const useField = (type, defaultValue = '') => {
  const [value, setValue] = useState(defaultValue)

  const resetValue = () => setValue(defaultValue)

  const onChange = (e) =>
    setValue(e.target.value)

  return [
    { type, value, onChange },
    resetValue
  ]
}