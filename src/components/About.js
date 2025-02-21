import React from 'react'

export default function About(props) {
  return (
        <div className="container" style= {{color: props.mode==='dark'?'white':'#042743'}}>
            <h2>About Us:</h2>
            <p>Welcome to <strong>Text Utility Tool</strong>, your all-in-one solution for text editing and analysis! This website provides a set of powerful tools to help you modify, format, and analyze text with ease.</p>
            <h3>Features:</h3>
            <p><strong>✔ Convert Text –</strong> Easily change text to uppercase or lowercase</p>
            <p><strong>✔ Find & Replace –</strong> Quickly find words and replace them effortlessly.</p>
            <p><strong>✔ Undo & Redo –</strong> Go back to previous versions of your text.</p>
            <p><strong>✔ Text-to-Speech –</strong> Listen to your text with a single click.</p>
            <p><strong>✔ Remove Extra Spaces –</strong> Clean up messy text formatting.</p>
            <p><strong>✔ Word & Character Count – </strong> Get real-time text analysis.</p>
            <p><strong>✔ Copy to Clipboard – </strong> Save time by copying text instantly.</p>
            <p>Whether you're writing an article, editing text, or analyzing content, this tool makes the process simple and efficient. 🚀</p>
            <p>Start editing now and enhance your text in just a few clicks!</p>
            
        </div>
    )
    }
