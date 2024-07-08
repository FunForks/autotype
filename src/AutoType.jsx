/**
 * src/AutoType.jsx
 */


import React, { useState, useEffect } from 'react'


const MIN = 1//0
const VAR = 2//0
// Creates an average delay of 20 ms,
// or 50 chars a second
// or 10 words / second
// or 600 wpm which is very probably faster than you can read
// and understand, and definitely 3x faster than you can type.


export const AutoType = ({
  text,
  edit,
  autoType=[],
  done
}) => {
  const [ todo, setTodo ] = useState({})
  const [ field, setField ] = useState("")
  const [ index, setIndex ] = useState(-1)
  const [ charsToType, setCharsToType ] = useState([])
  const [ typed, setTyped ] = useState({})
  const [ started, setStarted ] = useState(false)
  const [ edits, setEdits ] = useState([])
  const [ changes, setChanges ] = useState([])



  const prepareText = () => {
    if (!text) { return }

    const entries = Object.entries(text)

    const status = entries.reduce(( status, [ key, value ]) => {
      if (autoType.indexOf(key) < 0 || edit) {
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

    if (edit) {
      startEditing()
    }
  }


  const startEditing = () => {
    const edits = Object.entries(edit)
    setEdits(edits)        // [[ <field>, <changes> ], ... ]
    prepareField(edits[0])
  }


  const prepareField = delta => {
    if (!delta) {
      return done("editing")
    }

    setField(delta[0])
    setChanges(delta[1])
  }


  const doNextEdit = () => {
    const edit = changes.shift()

    if (!edit) {
      // Remove the changes that have been completed
      edits.shift()
      // Treat the next field
      return prepareField(edits[0])
    }

    const [ regex, replacement ] = edit
    const text = typed[field]

    setTyped({
      ...typed,
      [field]: text.replace(regex, replacement)
    })

    setTimeout(() => setChanges([ ...changes ]), 500)
  }


  const startTyping = () => {
    const next = Object.entries(todo)[0]
    if (!next) {
      return done(started && "typing")
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

    setStarted(true)

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
  useEffect(prepareText, [text, edit])
  // Start typing when todo text changes, then...
  useEffect(startTyping, [todo])
  // ... continue until the text is all typed
  useEffect(type, [index])
  useEffect(doNextEdit, [changes])


  return (
    <div>
      {fields}
    </div>
  )
}