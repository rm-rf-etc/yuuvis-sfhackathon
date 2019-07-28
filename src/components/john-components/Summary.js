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

const SummaryNote = ({ parentId, notes, groupId }) => (
    <li id={groupId} key={groupId} onClick={()=>scrollToEmail(parentId)}>
        {notes.map((note, _id) => {
            const noteId = _id+1;
            const sumId = `sum${noteId}`;

            return (
                <p
                    id={sumId}
                    key={sumId}
                    onMouseEnter={() => highlightString(noteId, "1")}
                    onMouseOut={() => removeStringHighlight(noteId,"1")}
                >
                    {note}
                </p>
            );
        })}
    </li>
);

const SummaryList = ({ data }) => (
    <React.Fragment>
        {data.map((entry, _id) => {
            const id = _id+1;
            const groupId = `sumGroup${id}`;

            if (entry.notes && entry.notes.length) {
                return (
                    <SummaryNote
                        key={groupId}
                        parentId={id}
                        notes={entry.notes}
                        groupId={groupId}
                        subject={entry.subject}
                    />
                );
            }
            return (
                <li id={groupId} key={groupId} onClick={()=>scrollToEmail(id)}>
                    {entry.summaries.map((summary, sumId) => (
                        <p key={sumId} id="sentence2">{summary}</p>
                    ))}
                </li>
            );
        })}
    </React.Fragment>
)

const Summary = () => {
    return (
        <Div>
            <h1>Thread Summaries</h1>
            <ul>
                <SummaryList data={data} />
            </ul>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Summary);