import React, { useState, useRef } from 'react';

export default function TextForm(props) {
  const [text, setText] = useState('');
  const [history, setHistory] = useState(['']);
  const [redoStack, setRedoStack] = useState([]);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);
 
  // Convert to UpperCase
  const handleUpClick = () => updateHistory(text.toUpperCase());

  // Convert to LowerCase
  const handleDownClick = () => updateHistory(text.toLowerCase());

  const handleClearClick = () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    updateHistory('');
  };

  // Undo Function
  const handleUndoClick = () => {
    if (history.length > 1) {
      const lastState = history[history.length - 2];
      setHistory(history.slice(0, -1));
      setRedoStack([text, ...redoStack]);
      setText(lastState);
    }
  };

  // Redo Function
  const handleRedoClick = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setRedoStack(redoStack.slice(1));
      setHistory([...history, nextState]);
      setText(nextState);
    }
  };

  const handleOnChange = (event) => updateHistory(event.target.value);

  const updateHistory = (newText) => {
    setText(newText);
    setHistory([...history, newText]);
    setRedoStack([]);
  };

  // Calculate Paragraph Function
  const calculateParagraphCount = () => text.split('\n\n').filter((p) => p.trim() !== '').length;

  // Speak function with pause/resume functionality
  const speak = () => {
    if (!text.trim()) return; // Prevent speaking an empty string

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (!speechRef.current) {
        speechRef.current = new SpeechSynthesisUtterance(text);
        speechRef.current.onend = () => setIsSpeaking(false);
      }

      window.speechSynthesis.resume();
      window.speechSynthesis.speak(speechRef.current);
      setIsSpeaking(true);
    }
  };

  // Stop speech completely
  const stopSpeaking = () => {
    if (speechRef.current) {
      window.speechSynthesis.cancel();
      speechRef.current = null; // Reset speech object
      setIsSpeaking(false);
    }
  };

  // Copy Text Function (Now works on mobile)
  const handleCopy = () => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Text copied to clipboard!");
  };

  // Extra Space Removal
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  // Find and Replace function
  const handleFindReplace = () => {
    if (findText.trim() === '') return;

    const regex = new RegExp(findText, 'gi');
    const newText = text.replace(regex, (match) =>
      match[0] === match[0].toUpperCase()
        ? replaceText.charAt(0).toUpperCase() + replaceText.slice(1)
        : replaceText
    );

    updateHistory(newText);
  };

  return (
    <>
      <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743'
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <div>
          <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
            Convert To Uppercase
          </button>
          <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleDownClick}>
            Convert To Lowercase
          </button>
          <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleClearClick}>
            Clear Text
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={handleUndoClick}>
            Undo
          </button>
          <button className="btn btn-primary mx-1 my-1" onClick={handleRedoClick}>
            Redo
          </button>
          <button disabled={text.length === 0} className="btn btn-warning mx-1 my-1" onClick={handleExtraSpaces}>
            Remove Extra Space
          </button>
          <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={speak}>
            {isSpeaking ? "Pause" : "Speak"}
          </button>
          <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={stopSpeaking}>
            Stop
          </button>
          <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>
            Copy Text
          </button>
        </div>
        <div className="my-3">
          <input
            type="text"
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743'
            }}
            className="form-control mb-2"
            placeholder="Find"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
          />
          <input
            type="text"
            style={{
              backgroundColor: props.mode === 'dark' ? '#13466e' : 'white',
              color: props.mode === 'dark' ? 'white' : '#042743'
            }}
            className="form-control mb-2"
            placeholder="Replace with"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
        </div>
        <div>
          <button disabled={text.length === 0} className="btn btn-primary" onClick={handleFindReplace}>
            Find & Replace
          </button>
        </div>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
        <h2>Your Text Summary</h2>
        <p>{text.split(/\s+/).filter((word) => word.length > 0).length} Words And {text.length} Characters</p>
        <p>{calculateParagraphCount()} Paragraphs</p>
        <p>{0.008 * text.split(' ').filter((word) => word.length > 0).length} Minutes Read</p>
        <h3>Preview</h3>
        <p>{text.length > 0 ? text : "Enter something in the textbox above to preview it here"}</p>
      </div>
    </>
  );
}
