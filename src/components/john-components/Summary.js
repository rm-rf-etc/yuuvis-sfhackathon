import React from 'react';
import styled from 'styled-components';
import { emailRecords } from '../../store';
import { safeId } from '../../helpers';

const Div = styled.div`
	display: flex;
	flex: 1;
	text-align: left;
	flex-direction: column;
	padding: 0 10px;
	overflow: hidden;
	position: relative;
	overflow-y: scroll;
	ul{
	    margin: 0;
	    padding: 0;
	    list-style: none;
	    perspective: 1000px;
	    li{
	        margin-bottom: 5px;
	        padding: 15px;
	        background: #eeeeee;
	        transition: all 100ms ease-in-out;
	        transform: scale(.9);
	        transform-origin: left;
	        position: relative;
	        &.activeSum{
	            background: white;
	            opacity: 1;
	            transform: scale(1);
	            box-shadow: 0px 2px 37px -30px black;
	            z-index: 99;
	        }
	        p{
	            padding: 5px;
	            margin: 0;
	            border-radius: 2px;
	            &.activeSingleSum{
	                color: #de5547;
	                text-decoration: underline;
	            }
	        }
	    }
	}
`;


const highlightString = (sumID, emailID) => {
    const singleSum = document.getElementById('sum' + sumID);
    const needle = singleSum.innerHTML;
    const rawDoc = document.getElementById(emailID);

    singleSum.classList.add('activeSingleSum');
    rawDoc.innerHTML  = rawDoc.innerHTML.replace(needle, '<span class="highlight">'+needle+'</span>');
}

const removeStringHighlight = (sumID, emailID) => {
    const singleSum = document.getElementById('sum' +sumID);
    const activeSingleSum = document.getElementsByClassName('activeSingleSum')[0];
    const needle = singleSum.innerHTML;
    const rawDoc = document.getElementById(emailID);
    if(activeSingleSum){
        activeSingleSum.classList.remove('activeSingleSum');
    }

    rawDoc.innerHTML  = rawDoc.innerHTML.replace('<span class="highlight">'+needle+'</span>', needle);
}

const scrollToEmail  = (emailID) => {
    const singleEmail = document.getElementById(emailID);
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

const SummaryNote = ({ parentId, notes, groupId, index }) => (
    <li className={parentId === "email_1" ? "activeSum" :  ""} id={groupId} key={groupId} onClick={()=>scrollToEmail(parentId)}>
        {Object.entries(notes).map(([noteId, note]) => {
            const sumId = `sum${safeId(noteId  + parentId)}`;
            return (
                <p
                    id={sumId}
                    key={sumId}
                    onMouseEnter={() => highlightString((noteId + parentId), parentId)}
                    onMouseOut={() => removeStringHighlight((noteId + parentId), parentId)}
                >
                    {note}
                </p>
            );
        })}
    </li>
);

const SummaryList = ({ data }) => (
    <React.Fragment>
        {Object.entries(data).map(([_id, entry]) => {
            const id = safeId(_id);
            const groupId = `sumGroup${id}`;

            if (entry.notes && entry.notes[0]) {
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
                    {Object.entries(entry.summaries).map(([sumId, summary]) => (
                        <p key={safeId(sumId)} id="sentence2">{summary.textValue}</p>
                    ))}
                </li>
            );
        })}
    </React.Fragment>
)

const Summary = () => {

    const [data, setData] = React.useState(null);
    !data && emailRecords.load((data) => setData(data));

    return data ? (
        <Div>
            <ul>
                <SummaryList data={data} />
            </ul>
        </Div>
    ) : null;
};

export default Summary;
