/**
 * src/AutoType.jsx
 */


import React, { useState, useEffect } from 'react'


const MIN = 20
const VAR = 40
// Creates an average delay of 40 ms,
// or 25 chars a second
// or 5 words / second 
// or 300 wpm


export const AutoType = ({ text, done }) => {
  const [ index, setIndex ] = useState(-1)
  const [ charsToType, setCharsToType ] = useState([])
  const [ typed, setTyped ] = useState("")
  

  const startTyping = () => {
    if (!text) { return }
    setCharsToType(text.split(""))
    setIndex(0)
  }


  const type = () => {
    if (index < 0) { return }

    const nextChar = charsToType[index]
    if (!nextChar) {
      setIndex(-1)
      return done()
    }

    setTyped(typed + nextChar)

    const delay = Math.floor(Math.random() * VAR) + MIN
    setTimeout(() => {
      setIndex(index + 1)
    }, delay)
  }


  // Start typing when text changes, then...
  useEffect(startTyping, [text])
  // ... continue until the text is all typed
  useEffect(type, [index])


  return (
    <div>
      <pre>{typed}</pre>
    </div>
  )
}