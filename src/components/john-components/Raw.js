import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const data = [
    {
        from: 'user/1',
        to: 'user/2',
        subject: 'Please approve my vacation request',
        body: `EMAIL 1 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
        summaries: [`Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.`],
        notes: ['at an alarming rate', 'The consequences are proving to be profound', 'aquifers dry up'],
    },
    {
        from: 'user/1',
        to: 'user/2',
        subject: 'Please approve my vacation request',
        body: `EMAIL 2 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
        summaries: [`Up to 75% of farmers rely on pumped groundwater to water their crops and water use is intensifying – at the same time that satellite images shows supplies are shrinking alarmingly.`],
    },
    {
        from: 'user/1',
        to: 'user/2',
        subject: 'Please approve my vacation request',
        body: `EMAIL 3 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
        summaries: [`The nature of the problem is revealed by US Geological Survey figures, which show that the total amount of fresh water on Earth comes to about 10.6m cubic km.`],
    },
    {
        from: 'user/1',
        to: 'user/2',
        subject: 'Please approve my vacation request',
        body: `EMAIL 4 Water is the driving force of all nature, Leonardo da Vinci claimed. Unfortunately for our planet, supplies are now running dry – at an alarming rate. The world’s population continues to soar but that rise in numbers has not been matched by an accompanying increase in supplies of fresh water. The consequences are proving to be profound. Across the globe, reports reveal huge areas in crisis today as reservoirs and aquifers dry up.`,
        summaries: [`By contrast, the total volume from lakes and rivers, humanity’s main source of fresh water, produces a sphere that is a mere 56 km in diameter.`],
    },
];

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

const email = (id, { to, from: _from, subject, body }) => (
    <Email id={`email${id+1}`} key={id+1}>
        <p>From: {_from}</p>
        <p>To: {to}</p>
        <p>Subject: {subject}</p>
        <p id="rawDoc">{body}</p>
    </Email>
);


const RawDoc = () => {

    return (
        <Div id="rawContainer">
            <div className="raw-inner">
                <h1>RAW View</h1>
                <React.Fragment>
                    {data.map((entry, id) => email(id, entry))}
                </React.Fragment>
            </div>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(RawDoc);
