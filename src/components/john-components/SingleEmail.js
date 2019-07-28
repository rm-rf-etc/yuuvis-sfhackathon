import React, { useState } from 'react';
import styled from 'styled-components';

const Email = styled.div`
    padding: 15px;
    background: #eeeeee;
    margin-bottom: 5px;
    border-radius: 1px;
    transition: all 300ms ease-in-out;
    p::selection {
        background: #b9f4ed;
    }
    &.active{
        background: white;
	    opacity: 1;
	}
	.highlight{
	    background: #efaba5;
	}
	.email-header{
	    p{
            margin: 0;
            padding: 0;
	        &:nth-child(1){
	            font-weight: bold;
	        }
	        &:nth-child(2){
	            font-size: 16px;
	            margin-bottom: 10px;
	        }
	        span{
	            font-weight: bold;
	        }
	        
	    }
	}
`;

const NoteEnter = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: white;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 20px -4px black;
    width: 100%;
    max-width: 400px;
    textarea{
        width: 100%;
        padding: 10px;
        border: 2px solid #b7adad;
        box-sizing: border-box;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .selectedText{
        font-style: italic;
    }
    .btn{
        padding: 8px 24px;
        color: white;
        font-size: 20px;
        border: none;
        width: 100%;
        max-width: 48%;
        border-radius: 4px;
    }
    .btn-red{
        background: #b53942;
        margin-right: 2%;
    }
    .btn-green{
        background: #50bb31;
    }
`;

const EnterNote = ({text, hideAddNote}) => {
    console.log("text", text);
    return(
    <NoteEnter>
        <h1>Add a note to your selection:</h1>
        <p className="selectedText">{text}</p>
        <textarea
            placeholder="your comment"
        />
        <button className="btn btn-red" onClick={hideAddNote}>Cancel</button>
        <button className="btn btn-green">Create Note</button>
    </NoteEnter>
)}


const SingleEmail = (props) => {

    const [highlighted, setHighlighted] = useState(false);
    const [highlightedText, setHighlightedText] = useState('');

    const showAddNote = () => {
        const selection = window.getSelection();
        const highlightedText = selection.toString();
        if(highlightedText.length > 0){
            setHighlighted(true);
            setHighlightedText(highlightedText);
        }
        //console.log('click detected', highlightedText);
    }

    const hideAddNote = () => {
        setHighlighted(false);
        setHighlightedText('');
    }

    const {id, entry, index} = props;
    const { from: _from, subject, body} = entry;

    return (
        <Email className={index === 0 ? "active" : ""} id={id} key={id} onMouseUp={()=>showAddNote()}>
            <div className="email-header">
                <p>{_from}@email.com</p>
                <p>to Me</p>
                <p><span>Subject:</span> {subject}</p>
            </div>
            <p id="rawDoc">
                {body}
            </p>
            {highlighted && (
                <EnterNote text={highlightedText} hideAddNote={hideAddNote}/>
            )}
        </Email>
    )
}

export default SingleEmail;
