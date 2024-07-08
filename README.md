# AutoType Component #

[Demo](https://funforks.github.io/autotype)

This React app demonstrates one way to simulate typing and editing auto-typed text.

See the AutoType component for a comprehensive description of the props that it can work with. These include

### Required
* **text**: an object with field names and their text content. For each field name, a `<pre>` element will be created inside a container div.

### Optional
* **autoType**: an array of string field names whose contents is to be typed
 * **speed**: average number of milliseconds taken to type each letter
 * **pause**: number of milliseconds to pause between fields or between edits.
 * **edit**: an object containing Regular Expressions and replacement strings, which can be used to update the typed text.
 * **done**: a function which will be called with the argument "typing" or "editing", when the given action is complete.
 * **className** to apply to the container `<div>`