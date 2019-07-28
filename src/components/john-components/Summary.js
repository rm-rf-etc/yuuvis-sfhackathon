import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
	ul{
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    border-top: 1px solid gray;
	    border-bottom: 1px solid gray;
	    li{
	        border-bottom: 1px solid gray;
	        padding: 15px;
	        background: white;
	        transition: all 100ms ease-in-out;
	        &.activeSum{
	            background: gray;
	        }
	        :last-child{
	            border: 0;
	        }
	        p{
	            background: white;
	            padding: 5px;
	            border-radius: 2px;
	            &.activeSingleSum{
	                background: yellow;
	            }
	        }
	    }
	}
`;


const highlightString = (sumID, emailID) => {
    const singleSum = document.getElementById('sum' +sumID);
    const needle = singleSum.innerHTML;
    const rawDoc = document.getElementById("email"+emailID);

    singleSum.classList.add('activeSingleSum');
    rawDoc.innerHTML  = rawDoc.innerHTML.replace(needle, '<span class="highlight">'+needle+'</span>');
}

const removeStringHighlight = (sumID,emailID) => {
    const singleSum = document.getElementById('sum' +sumID);
    const activeSingleSum = document.getElementsByClassName('activeSingleSum')[0];
    const needle = singleSum.innerHTML;
    const rawDoc = document.getElementById("email"+emailID);
    if(activeSingleSum){
        activeSingleSum.classList.remove('activeSingleSum');
    }

    rawDoc.innerHTML  = rawDoc.innerHTML.replace('<span class="highlight">'+needle+'</span>', needle);
}

const scrollToEmail  = (emailID) => {
    const singleEmail = document.getElementById('email' + emailID);
    const singleSummaryGroup = document.getElementById('sumGroup'+emailID);
    const activeEmail = document.getElementsByClassName('active')[0];
    const activeSum = document.getElementsByClassName('activeSum')[0];
    if(activeEmail){
        activeEmail.classList.remove('active');
    }
    if(activeSum){
        activeSum.classList.remove('activeSum');
    }
    singleSummaryGroup.classList.add('activeSum');
    singleEmail.classList.add('active');
    singleEmail.scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
}

const Summary = () => {
    return (
        <Div>
            <h1>Thread Summaries</h1>
            <ul>
                <li id="sumGroup1" onClick={()=>scrollToEmail("1")}>
                    <p id="sum1"
                       onMouseEnter={() => highlightString("1", "1")}
                       onMouseOut={() => removeStringHighlight("1","1")}
                    >at an alarming rate</p>
                    <p id="sum2"
                       onMouseEnter={() => highlightString("2","1")}
                       onMouseOut={() => removeStringHighlight("2","1")}
                    >The consequences are proving to be profound</p>
                    <p id="sum3"
                       onMouseEnter={() => highlightString("3","1")}
                       onMouseOut={() => removeStringHighlight("3","1")}
                    >aquifers dry up</p>
                </li>
                <li id="sumGroup2" onClick={()=>scrollToEmail("2")}>
                    <p id="sentence2">Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.</p>
                </li>
                <li id="sumGroup3"  onClick={()=>scrollToEmail("3")}>
                    <p id="sentence3">The nature of the problem is revealed by US Geological Survey figures, which show that the total amount of fresh water on Earth comes to about 10.6m cubic km.</p>
                </li>
                <li id="sumGroup4"  onClick={()=>scrollToEmail("4")}>
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