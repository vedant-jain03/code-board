

import React, { useEffect, useRef, useState } from 'react'
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/material.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/lib/codemirror.css'
import ACTIONS from '../Action';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Editor({ socketRef, id, setLiveCode, editorRef }) {
  // const editorRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtime'), {
        mode: { name: 'javascript', json: true },
        theme: 'material',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
      });

      editorRef.current.on('change', (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        setLiveCode(code)
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
          setLiveCode(code);
        }
      })
      socketRef.current.on('access_change', ({ access }) => {
        toast.success(`Editor is ${access ? 'lock' : 'unlock'}`)
        editorRef.current.setOption('readOnly', access);
      })
    }
    return () => {
      socketRef.current.off(ACTIONS.SYNC_CODE)
    }
  }, [socketRef.current])
  return (
    <textarea id='realtime' disabled="true">

    </textarea>
  )
}

export default Editor