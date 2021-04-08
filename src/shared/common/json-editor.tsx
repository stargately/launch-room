import { Controlled as CodeMirror } from "react-codemirror2";
import React, { useState } from "react";
// @ts-ignore
import jsonlint from "jsonlint-mod";

if (typeof navigator !== "undefined") {
  require("codemirror/addon/selection/active-line.js");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/addon/edit/closebrackets.js");
  require("codemirror/addon/lint/lint.js");
  require("codemirror/addon/lint/json-lint.js");
  require("codemirror/addon/fold/foldcode.js");
  require("codemirror/addon/fold/foldgutter.js");
}

declare const window: any;

type Props = {
  value?: string;
  onChange?: (v: string) => void;
};

const JsonEditor = ({ value, onChange }: Props) => {
  const [mounted, setMounted] = useState(false);

  const _onEditorDidMount = (editor: {
    setSize: (arg0: string, arg1: string) => void;
  }) => {
    window.jsonlint = jsonlint;
    editor.setSize("100%", "76px");
  };

  const _onChange = () => setMounted(true);

  const _onBeforeChange = (_editor: any, _data: any, jsonValue: string) =>
    onChange?.(jsonValue);

  return (
    <CodeMirror
      value={value || ""}
      options={{
        mode: "application/json",
        theme: "neo",
        lineNumbers: true,
        smartIndent: true,
        tabSize: 2,
        lint: mounted,
        gutters: [
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
          "CodeMirror-lint-markers",
        ],
        // @ts-ignore
        autoCloseBrackets: true,
        styleActiveLine: true,
      }}
      editorDidMount={_onEditorDidMount}
      onChange={_onChange}
      onBeforeChange={_onBeforeChange}
    />
  );
};

export default JsonEditor;
