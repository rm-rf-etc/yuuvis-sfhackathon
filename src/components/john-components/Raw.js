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

// const Email = styled.div`
//     padding: 15px;
//     background: #eeeeee;
//     margin-bottom: 5px;
//     border-radius: 1px;
//     transition: all 300ms ease-in-out;
    
//     &.active{
//         background: white;
// 	    opacity: 1;
// 	}
// 	.highlight{
// 	    background: #efaba5;
// 	}
// 	.email-header{
// 	    p{
//             margin: 0;
//             padding: 0;
// 	        &:nth-child(1){
// 	            font-weight: bold;
// 	        }
// 	        &:nth-child(2){
// 	            font-size: 16px;
// 	            margin-bottom: 10px;
// 	        }
// 	        span{
// 	            font-weight: bold;
// 	        }
	        
// 	    }
// 	}
// `;


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
