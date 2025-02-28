import React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { jsxDEV } from "react/jsx-dev-runtime";

import { fromLezer } from "hast-util-from-lezer";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";

import type { LRParser } from "@lezer/lr";

export const Parsers = React.createContext<Record<string, LRParser>>({});

export interface CodeProps {
  source: string;
  language?: string;
  className?: string | ((language?: string) => string);
}

export const Code: React.FC<CodeProps> = (props) => {
  const parsers = React.useContext(Parsers);

  const className =
    typeof props.className === "string"
      ? props.className
      : props.className?.(props.language);

  if (props.language === undefined || parsers[props.language] === undefined) {
    return <code className={className}>{props.source}</code>;
  }

  const parser = parsers[props.language];
  const tree = parser.parse(props.source);
  const root = fromLezer(props.source, tree);
  const content = toJsxRuntime(root, { Fragment, jsx, jsxs, jsxDEV });
  return <code className={className}>{content}</code>;
};
