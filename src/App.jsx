/**
 * src/App.jsx
 */


import React, { useState } from 'react'
import { AutoType } from './AutoType'


const BLANK = { ticket: "", title: "", description: "" }
const SOURCE = {
  ticket: "MVT-01",
  title: "Embed YouTube Video",
  description: `In this section, we’ll explore rendering a React app or component in an iframe.

This is a good strategy when you want to cut CSS excesses or use a full-fledged app in another app without any interferences, especially when you want the content of the iframe to share state with its parent.`
}

const EDIT = {
  description: [
    [/section/, "tutorial"],
    // Use lookbehind and lookahead to remove text
    [/(?<=interference)s(?=, especially)/, ""],
    // Replace the _end_ of the text to append text
    [/$/, `

Now read on.`]
    ]
}



export const App = () => {
  const [ prompt, setPrompt ] = useState(BLANK)
  const [ done, setDone ] = useState(false)
  const [ edit, setEdit ] = useState()


  const startTyping = () => {
    setPrompt(SOURCE)
  }


  const startEditing = () => {
    setEdit(EDIT)
  }


  const doneAction = type => {
    if (type) {
      console.log("done", type);
      setDone(type)
    }
  }


  return (
    <>
      <AutoType
        text={SOURCE}
        done={doneAction}
      />
      <button
        onClick={startTyping}
      >
        Start Typing
      </button>
      <button
        onClick={startEditing}
        disabled={!done}
      >
        Edit
      </button>
      <AutoType
        text={prompt}
        autoType={[ "title", "description" ]}
        edit={edit}
        done={doneAction}
      />
    </>
  )
}