import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CHAPTER_REGEX = /^\d{3}\.\s\w+/i
const ENTRY_REGEX = /^\d{3}\.\d{1,}\.?[a-z]?\s\w+/i
const MENTION_REGEX = /(?!^)\d{3}\.\d{1,}[a-z]?/ig

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

async function* lineIterator(stream) {
  const utf8Decoder = new TextDecoder("utf-8");
  let reader = stream.getReader();
  let {value: chunk, done: readerDone} = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk, {stream: true}) : "";

  let re = /\r\n|\n|\r/gm;
  let startIndex = 0;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) 
        break;

      let remainder = chunk.substr(startIndex);
      ({value: chunk, done: readerDone} = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk, {stream: true}) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }

  if (startIndex < chunk.length)
    yield chunk.substr(startIndex);
}

const processEntryLine = (line) => {
  const parts = []
  const matches = line.matchAll(MENTION_REGEX)
  let lastIndex = 0

  if (matches.done)
    return line

  for (const match of matches) {
    parts.push(line.slice(lastIndex, match.index))
    parts.push(
      <Link key={match[0]} to={`/${match[0]}`}>{match[0]}</Link>
    )
    lastIndex = match.index + match[0].length
  }

  parts.push(line.slice(lastIndex, line.length))
  return parts
}

export const parseRules = async (stream) => {
	const state = {
		chapters: [],
		entries: []
	}

  if (!stream) return stream

  for await (let line of lineIterator(stream)) {
    if (CHAPTER_REGEX.test(line) && !state.chapters.includes(line))
      state.chapters.push(line)
    else if (ENTRY_REGEX.test(line) && !state.entries.includes(line))
      state.entries.push(processEntryLine(line))
  }

  console.log(state)

	return state
}