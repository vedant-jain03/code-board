import React, { useEffect, useRef } from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'
import ACTIONS from '../Action';

function Editor({ socketRef, id }) {
  console.log(id);
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: { name: 'javascript', json: true },
        theme: 'material',
        readOnly: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });
      editorRef.current.on('beforeChange', function (cm, change) {
        change.cancel();
      });
      editorRef.current.on('change', (instance, changes) => {
        console.log(changes);
        changes.cancel();
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            id,
            code
          })
        }
      });
    }
    init();
  }, [])
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      })
    }
    var editor = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'));
    editor.on('beforeChange', function (cm, change) {
      change.cancel();
    });
    return () => {
      socketRef.current.off(ACTIONS.SYNC_CODE)
    }
  }, [socketRef.current])
  return (
    <textarea id='realtimeEditor'>

    </textarea>
  )
}

export default Editor