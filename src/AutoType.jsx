/**
 * src/AutoType.jsx
 */


import React, { useState, useEffect } from 'react'


const MIN = 10
const VAR = 20
// Creates an average delay of 20 ms,
// or 50 chars a second
// or 10 words / second
// or 600 wpm which is very probably faster than you can read
// and understand, and definitely 3x faster than you can type.


export const AutoType = ({ text, autoType=[], done }) => {
  const [ todo, setTodo ] = useState({})
  const [ field, setField ] = useState("")
  const [ index, setIndex ] = useState(-1)
  const [ charsToType, setCharsToType ] = useState([])
  const [ typed, setTyped ] = useState({})


  const prepareText = () => {
    if (!text) { return }

    const entries = Object.entries(text)

    const status = entries.reduce(( status, [ key, value ]) => {
      if (autoType.indexOf(key) < 0) {
        // Consider that this text has already been typed
        status.done[key] = value

      } else {
        // Get ready to type this text in good time
        status.done[key] = ""
        status.todo[key] = value
      }

      return status
    }, { done: {}, todo: {} })

    setTyped(status.done)
    setTodo(status.todo)
  }


  const startTyping = () => {
    const next = Object.entries(todo)[0]
    if (!next) {
      return done()
    }

    setField(next[0])
    setCharsToType(next[1].split(""))

    setTimeout(() => setIndex(0), 500)
  }


  const type = () => {
    if (index < 0) { return }

    const nextChar = charsToType[index]
    if (!nextChar) {
      delete todo[field]
      setTodo({ ...todo })
      setIndex(-1)
      return
    }

    const done = typed[field] + nextChar
    setTyped({ ...typed, [field]: done })

    const delay = Math.floor(Math.random() * VAR) + MIN
    setTimeout(() => {
      setIndex(index + 1)
    }, delay)
  }


  const fields = Object.entries(typed).map(([ field, text ]) => {
    return (
      <pre
        key={field}
        name={field}
      >
        {text}
      </pre>
    )
  })


  // Determine what has already been typed, and what is still todo
  useEffect(prepareText, [text])
  // Start typing when todo text changes, then...
  useEffect(startTyping, [todo])
  // ... continue until the text is all typed
  useEffect(type, [index])


  return (
    <div>
      {fields}
    </div>
  )
}