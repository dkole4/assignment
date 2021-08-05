import { useState } from "react"


export const useField = (type, defaultValue = "") => {
	const [value, setValue] = useState(defaultValue)

	const resetValue = () => setValue(defaultValue)
	
	const onChange = (e) =>
		setValue(e.target.value)

	return [
		{ type, value, onChange },
		resetValue
	]
}

export const parseRules = (text) => {
	const state = {
		chapters: [],
		entries: []
	}

  if (!text) {
    console.log(text)
    return null
  }

	const lines = text.split(/\n/)

  state.chapters = lines.filter(line => /\d{3}.\s\w+/.test(line))
  state.entries = lines.filter(line => /\d{3}.\d*\w{1}\s\w+/.test(line))
      
	return state
}