import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
	padding: 15px;
	overflow: hidden;
	overflow-y: scroll;
	border-top: 1px solid gray;
	background: gray;
	.raw-inner{
	    padding-bottom: 400px;
	}
	
`;

const Email = styled.div`
    padding: 15px;
    background: white;
    margin-bottom: 20px;
    border-radius: 4px;
    opacity: .6;
    transition: all 300ms ease-in-out;
    &.active{
	    opacity: 1;
	}
	.highlight{
	    background: yellow;
	}
	
`;


const RawDoc = () => {

    return (
        <Div id="rawContainer">
            <div className="raw-inner">
                <h1>RAW View</h1>
                <Email id="email1">
                    <p>From: User1</p>
                    <p>To: User2</p>
                    <p>Subject: Please approve my vacation request</p>
                    <p id="rawDoc">
                        EMAIL 1 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                    </p>
                </Email>
                <Email id="email2">
                    <p>From: User1</p>
                    <p>To: User2</p>
                    <p>Subject: Please approve my vacation request</p>
                    <p id="rawDoc">
                        EMAIL 2 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                    </p>
                </Email>
                <Email id="email3">
                    <p>From: User1</p>
                    <p>To: User2</p>
                    <p>Subject: Please approve my vacation request</p>
                    <p id="rawDoc">
                        EMAIL 3 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                    </p>
                </Email>
                <Email id="email4">
                    <p>From: User1</p>
                    <p>To: User2</p>
                    <p>Subject: Please approve my vacation request</p>
                    <p id="rawDoc">
                        EMAIL 4 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.
                    </p>
                </Email>
            </div>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(RawDoc);