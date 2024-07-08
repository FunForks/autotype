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



export const App = () => {
  const [ prompt, setPrompt ] = useState(BLANK)


  const startTyping = () => {
    setPrompt(SOURCE)
  }


  const doneTyping = () => {
    console.log("Done!")
  }


  return (
    <>
      <AutoType
        text={SOURCE}
        done={doneTyping}
      />
      <button
        onClick={startTyping}
        type="submit"
      >
        Start Typing
      </button>
      <AutoType
        text={prompt}
        autoType={[ "title", "description" ]}
        done={doneTyping}
      />
    </>
  )
}