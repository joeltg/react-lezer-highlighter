# react-lezer-highlighter

```tsx
import React from "react"
import { createRoot } from "react-dom/client"

import { Code, Parsers } from "react-lezer-highlighter"

import { parser as javascriptParser } from "@lezer/javascript"
import { parser as jsonParser } from "@lezer/json"

import "react-lezer-highlighter/styles/default.css"

const parsers = {
	js: javascriptParser,
	jsx: javascriptParser.configure({ dialects: "jsx" }),
	ts: javascriptParser.configure({ dialects: "ts" }),
	tsx: javascriptParser.configure({ dialects: "ts jsx" }),
	json: jsonParser,
}

const code = `function foo(a, b) {
	return a + b
}
`

const App: React.FC<{}> = ({}) => (
	<Parsers.Provider value={parsers}>
		<h1>Hello world</h1>
		<Code language="js" source={source} />
	</Parsers.Provider>
)

const root = createRoot(document.getElementById("root"))
root.render(<App />)
```
