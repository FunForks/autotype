/**
 * src/App.jsx
 */


import React, { useState } from 'react'
import { AutoType } from './AutoType'

const SOURCE = [
`All in the merry month of May`,`
the green buds all were swelling`,`
Sweet William on his death bed lay`,`
for love of Barbra Allen.`
]


export const App = () => {
  const [ line, setLine ] = useState(0)
  const [ text, setText ] = useState(SOURCE[line])
  const [ prompt, setPrompt ] = useState("")  
  
  
  const updateText = ({ target }) => {
    setText(target.value)
  }


  const startTyping = () => {
    setPrompt(text)
  }


  const doneTyping = () => {  
    const next = line + 1
    setLine(next)
    setText(SOURCE[next] || "")
  }


  return (
    <>
      <input
        type="text"
        id="text"
        name="text"
        value={text}
        onChange={updateText}
      />
      <button
        onClick={startTyping}
        type="submit"
      >
        Start Typing
      </button>
      <AutoType
        text={prompt}
        done={doneTyping}
      />
    </>
  )
}