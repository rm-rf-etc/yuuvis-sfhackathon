import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
`;

const Highlight = styled.span`
    background: yellow;
`;

const findLocationOfString = (strID) => {
    const needle = document.getElementById(strID).innerHTML;
    const rawDoc = document.getElementById("rawDoc");
    rawDoc.innerHTML  = rawDoc.innerHTML.replace(needle, '<div class="highlight"><a id='+strID+'"-loc"></a>'+needle+'</div>');
    console.log("finished");
}

const scrollToEmail  = (emailID) => {
    const singleEmail = document.getElementById(emailID);
    const activeEmails = document.getElementsByClassName('active')[0];
    if(activeEmails){
        activeEmails.classList.remove('active');
    }
    singleEmail.classList.add('active');
    singleEmail.scrollIntoView();
}

const Summary = () => {
    return (
        <Div>
            <h1>Thread Summaries</h1>
            <ul>
                <li onClick={()=>scrollToEmail("email1")}>
                    <p id="sentence1">The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water.</p>
                </li>
                <li onClick={()=>scrollToEmail("email2")}>
                    <p id="sentence2">Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.</p>
                </li>
                <li onClick={()=>scrollToEmail("email3")}>
                    <p id="sentence3">The nature of the problem is revealed by US Geological Survey figures, which show that the total amount of fresh water on Earth comes to about 10.6m cubic km.</p>
                </li>
                <li onClick={()=>scrollToEmail("email4")}>
                    <p id="sentence4">By contrast, the total volume from lakes and rivers, humanity’s main source of fresh water, produces a sphere that is a mere 56 km in diameter.</p>
                </li>
            </ul>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Summary);