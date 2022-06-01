# react-lezer-highlighter

```tsx
import React from "react"
import { createRoot } from "react-dom/client"

import { Code, Parsers } from "react-lezer-highlighter"
import { parser as javascriptParser } from "@lezer/javascript"

const parsers = {
	javascript: javascriptParser,
}

const code = `function foo(a, b) {
	return a + b
}
`

const App: React.FC<{}> = ({}) => (
	<Parsers.Provider value={parsers}>
		<h1>Hello world</h1>
		<Code language="javascript" source={source} />
	</Parsers.Provider>
)

const root = createRoot(document.getElementById("root"))
root.render(<App />)
```
