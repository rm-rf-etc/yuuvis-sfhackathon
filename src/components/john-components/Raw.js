import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
	padding: 15px;
	max-height: 500px;
	overflow: hidden;
	overflow-y: scroll;
	border-top: 1px solid gray;
	.active{
	    background: yellow;
	}
`;

const RawDoc = () => {
    console.log('my state');
    return (
        <Div id="rawContainer">
            <h1>RAW View</h1>
            <div id="email1">
                <p>From: User1</p>
                <p>To: User2</p>
                <p>Subject: Please approve my vacation request</p>
                <p id="rawDoc">
                    Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                </p>
            </div>
            <div id="email2">
                <p>From: User1</p>
                <p>To: User2</p>
                <p>Subject: Please approve my vacation request</p>
                <p id="rawDoc">
                    Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                </p>
            </div>
            <div id="email3">
                <p>From: User1</p>
                <p>To: User2</p>
                <p>Subject: Please approve my vacation request</p>
                <p id="rawDoc">
                    Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                </p>
            </div>
            <div id="email4">
                <p>From: User1</p>
                <p>To: User2</p>
                <p>Subject: Please approve my vacation request</p>
                <p id="rawDoc">
                    Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                </p>
            </div>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(RawDoc);