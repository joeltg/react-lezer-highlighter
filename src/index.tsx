import React from "react";

import { fromLezer } from "hast-util-from-lezer";
import { Jsx, toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import type { LRParser } from "@lezer/lr";
import { jsxDEV } from "react/jsx-dev-runtime";

export const Parsers = React.createContext<Record<string, LRParser>>({});

export interface CodeProps {
  language?: string;
  source: string;
}

export const Code: React.FC<CodeProps> = (props) => {
  const parsers = React.useContext(Parsers);
  if (props.language !== undefined && props.language in parsers) {
    const parser = parsers[props.language];
    const tree = parser.parse(props.source);
    const root = fromLezer(props.source, tree);

    const content = toJsxRuntime(root, {
      Fragment,
      jsx: jsx as Jsx,
      jsxs: jsxs as Jsx,
      jsxDEV: jsxDEV as Jsx,
    });

    return <code className={props.language}>{content}</code>;
  } else {
    return <code className={props.language}>{props.source}</code>;
  }
};
