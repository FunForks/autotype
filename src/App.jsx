/**
 * src/App.jsx
 */


import React, { useState } from 'react'
import { AutoType } from './AutoType'
import { BLANK, SOURCE, EDIT } from './assets/data.js'



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
      <div className="controls">
        <h1>Expected Result</h1>
        <AutoType
          text={SOURCE}
        />
        <div className="buttons">
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
            Auto Edit
          </button>
        </div>
      </div>
      <AutoType
        text={prompt}
        autoType={[ "first", "last", "email", "address" ]}
        speed={50}
        pause={750}
        edit={edit}
        done={doneAction}
        className="autotype"
      />
    </>
  )
}