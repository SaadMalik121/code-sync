import CodeEditor from "@uiw/react-textarea-code-editor";
import React, { useEffect, useRef } from "react";
function Editor({ socketRef, roomId }) {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const codeRef = useRef();
  useEffect(() => {
    codeRef.current = `function add(a, b) {\n  return a + b;\n}`;
    if (code == `function add(a, b) {\n  return a + b;\n}`) {
      console.log("code is same");
    } else {
      console.log("codechnfge");
      socketRef.current.emit("codeChange", { roomId, code });
    }
    socketRef?.current?.on("codeChange", ({ code }) => {
      console.log(code);
      setCode(code);
    });

    return () => {
      socketRef.current.off("codeChange");
    };
  });

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
