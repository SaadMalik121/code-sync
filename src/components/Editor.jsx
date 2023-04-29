import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useEffect } from "react";
function Editor() {
  useEffect(() => {
    console.log(code);
  });
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  return (
    <CodeEditor
      value={code}
      language="js"
      linNumberVisible={true}
      placeholder="Please enter JS code."
      onChange={(evn) => setCode(evn.target.value)}
      padding={15}
      style={{
        fontSize: 20,
        backgroundColor: "black",
        flex: 1,
        height: "100vh",
        fontFamily:
          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
      }}
    />
  );
}

export default Editor;
