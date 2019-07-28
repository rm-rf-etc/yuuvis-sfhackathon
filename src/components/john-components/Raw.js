import React from 'react';
import styled from 'styled-components';
import {emailRecords, searchResultsRecord} from '../../store';
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
    const [search, setSearch] = React.useState(null);
    !data && emailRecords.load((data) => setData(data));
    !search && data  !== null && searchResultsRecord.on((rdata) => {
        const results = JSON.parse(rdata);
        const newData = {};
        //console.log("raw results",rdata);
        if(data && results){
            results.forEach((item)=>{
                if(data[item]){
                    newData[item] = data[item];
                }
            });
            setData(newData);
            //console.log("NEW DATA",newData);
        }else{

        }
        setSearch(rdata);
    });
    return data ? (
        <Div id="rawContainer">
            <div className="raw-inner">
                <React.Fragment>
                    {Object.entries(data).map(([id, value], index) => (
                        <SingleEmail
                            key={safeId(id)}
                            index={index}
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
