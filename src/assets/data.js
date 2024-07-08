const BLANK = {
  first: "",
  last: "",
  email: "",
  address: ""
}

const SOURCE = {
  first: "John",
  last: "Doe",
  email: "john.doe@example.com",
  address: `7366 Basilia Viaduct,
East Trent,
D3I 0C1
Cantada`
}

const EDIT = {
  // Simple replacement
  first: [[ /john/i, "Jane"]],
  last: [
    // Replace the beginning of the text to prepend text
    [/^/, "Howdy-"],
    [/e$/, "ody"],
  ],
  email: [
    [/^[^@]+/, "jane"],
    // Use lookbehind or lookahead to insert text
    [/(?<=@)/, "mail."],
    // A simple way to remove text
    [/m$/, ""],
  ],
  // Using a lookbehind to isolate a letter to remove
  address: [[/(?<=Can)t/, ""]]
}

export {
  BLANK,
  SOURCE,
  EDIT
}
