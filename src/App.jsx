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
  title: [[ /^/, "1. "]],
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
  const [ edit, setEdit ] = useState()
  const [ busy, setBusy ] = useState(false)
    

  const startTyping = () => {
    if (busy) { return }

    setBusy("typing")
    setEdit("")
    setPrompt({ ...SOURCE }) // clone SOURCE to trigger re-render
  }


  const startEditing = () => {
    if (busy) { return }
    
    setBusy("editing")
    setPrompt({ ...SOURCE }) // clone SOURCE to trigger re-render
    setEdit(EDIT)
  }


  const doneAction = type => {
    if (type) {
      setBusy(false)
      console.log("done:", type); // DO SOMETHING MORE INTERESTING
    }
  }


  return (
    <>
      <AutoType
        text={SOURCE}
      />
      <button
        onClick={startTyping}
        disabled={busy}
      >
        Start Typing
      </button>
      <button
        onClick={startEditing}
        disabled={busy}
      >
        Edit
      </button>
      <AutoType
        text={prompt}
        autoType={[ "title", "description" ]}
        speed={1}
        pause={250}
        edit={edit}
        done={doneAction}
        className="autotype"
      />
    </>
  )
}