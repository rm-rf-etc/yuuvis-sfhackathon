import React from 'react';
import styled from 'styled-components';
import { emailRecords } from '../../store';
import SingleEmail from './SingleEmail';
import { safeId } from '../../helpers';

const Div = styled.div`
	display: flex;
	text-align: left;
	flex-direction: column;
	padding: 0 5px;
	overflow: hidden;
	position: relative;
	overflow-y: scroll;
	.raw-inner{
	    padding-bottom: 400px;
	}
	
`;

const RawDoc = () => {

    const [data, setData] = React.useState(null);
    !data && emailRecords.load((data) => setData(data));

    return data ? (
        <Div id="rawContainer">
            <div className="raw-inner">
                <React.Fragment>
                    {Object.entries(data).map(([id, value]) => (
                        <SingleEmail
                            key={safeId(id)}
                            id={safeId(id)}
                            entry={value}
                        />
                    ))}
                </React.Fragment>
            </div>
        </Div>
    ) : null;
};

export default RawDoc;
