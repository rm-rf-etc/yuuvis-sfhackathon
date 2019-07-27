import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
	display: flex;
	text-align: center;
`;

const RawDoc = () => {
    return (
        <Div>
            <h1>Raw Doc</h1>
        </Div>
    );
};

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps)(RawDoc);