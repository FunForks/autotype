/**
 * AutoType.jsx
 *
 * This component accepts a `type` prop which must have the
 * format:
 *   { <string field name>: <string>, ... }
 *
 * NO SANITY CHECKING IS PERFORMED *
 *
 * It will create a <div> containing a <pre> element for
 * every key/value pair. Each <pre> element will have a `name`
 * property whose value matches the given field name.
 *
 * Strings can be template strings which include new lines.
 *
 * Other props are permitted:
 *
 * + autoType:  Can be an array of string field names. The text
 *              of the <pre> elements with those names will be
 *              typed at `speed` (see below)
 *
 * + speed:     Can be a positive integer. The default speed of 20
 *              (milliseconds per letter) reates an average delay
 *              of 20 ms per character
 *              or 50 chars a second
 *              or 10 words / second
 *              or 600 wpm which is very probably faster than you
 *              can read and understand, and definitely 3x faster
 *              than you can type.
 * 
 * + pause:     Can be a positive integer number of milliseconds
 *              to pause while moving from one field to the next
 *              or between edits.
 *
 * + edit:      Can be an object with the format:
 *              { <string field name>: [
 *                  [ <regex>, <replacement string> ],
 *                  ...
 *                ]
 *              }
 *              This will run the following (pseudo-code) for each
 *              entry. There will be a short pause between each
 *              update
 *
 *                 <field.text>.replace(regex, replacement)
 *
 *              To replace every occurence of a string, use the
 *              /regex/g global flag.
 *              To insert text, use a lookbehind for the preceding
 *              word(s).
 *              To delete text, use a lookaround regex and an
 *              empty string.
 *              To prepend text, use the regex /^/
 *              To append text, use the regex /$/
 *
 * + done:      Can be a function which will be called with the
 *              argument "typing" or "editing", when the given
 *              action is complete.
 *
 * + className: Can be a string className that will be applied to
 *              the container <div>
 */


import React, { useState, useEffect } from 'react'


export const AutoType = ({
  text,
  autoType=[],
  speed=20,
  pause=500,
  edit,
  done,
  className
}) => {
  const [ todo,        setTodo ]        = useState({})
  const [ field,       setField ]       = useState("")
  const [ index,       setIndex ]       = useState(-1)
  const [ charsToType, setCharsToType ] = useState([])
  const [ typed,       setTyped ]       = useState({})
  const [ started,     setStarted ]     = useState(false)
  const [ edits,       setEdits ]       = useState([])
  const [ changes,     setChanges ]     = useState([])


  // Minimal check for usability of edit
  const applyEdits = typeof edit === "object"


  /** Called by useEffect when text or edit change */
  const prepareText = () => {
    if (!text) { return }

    const entries = Object.entries(text)

    const status = entries.reduce(( status, [ key, value ]) => {
      if (autoType.indexOf(key) < 0 || applyEdits) {
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

    if (applyEdits) {
      startEditing()
    }
  }


  /** Called by prepareText */
  const startEditing = () => {
    const edits = Object.entries(edit)
    // [[ <field>, <changes> ], ... ]
    setEdits(edits)
    prepareNextField(edits.shift())
  }


  /** Called by startEditing and doNextEdit */
  const prepareNextField = delta => {
    if (!delta) {
      typeof done === "function" && done("editing")
      return
    }

    setField(delta[0])
    setChanges([ ...delta[1] ])
  }


  /** Called by useEffect when `changes` changes */
  const doNextEdit = () => {
    const edit = changes.shift()

    if (!edit) {
      // Treat the next field
      return prepareNextField(edits.shift())
    }

    const [ regex, replacement ] = edit
    const text = typed[field]

    setTyped({
      ...typed,
      [field]: text.replace(regex, replacement)
    })

    setTimeout(() => setChanges([ ...changes ]), pause)
  }


  /** Called by useEffect when todo changes */
  const startTyping = () => {
    const next = Object.entries(todo)[0]    

    if (!next) {
      started && typeof done === "function" && done("typing")
      setCharsToType([]) // apparently necessary with long pause
      return
    }

    setField(next[0])
    setCharsToType(next[1].split(""))

    setTimeout(() => setIndex(0), pause)
  }


  /** Called by useEffect when type changes */
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

    const delay = Math.floor(Math.random() * speed) + speed / 2
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

  // Treat edits, if there are any
  useEffect(doNextEdit, [changes])


  return (
    <div className={className}>
      {fields}
    </div>
  )
}