import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: center;
`;

const Summary = () => {
    console.log('my state');
    return (
        <Div>
            <h1>Summary</h1>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(Summary);