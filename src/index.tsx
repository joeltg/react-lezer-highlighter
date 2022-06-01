import React, { createContext, useContext } from "react"

import { fromLezer } from "hast-util-from-lezer"
import { toH } from "hast-to-hyperscript"

import type { LRParser } from "@lezer/lr"

export const Parsers = createContext<Record<string, LRParser>>({})

export interface CodeProps {
	language?: string
	source: string
}

export const Code: React.FC<CodeProps> = (props) => {
	const parsers = useContext(Parsers)
	if (props.language !== undefined && props.language in parsers) {
		const parser = parsers[props.language]
		const tree = parser.parse(props.source)
		const root = fromLezer(props.source, tree)
		const content = toH(React.createElement, root)
		return <code className={props.language}>{content}</code>
	} else {
		return <code className={props.language}>{props.source}</code>
	}
}
