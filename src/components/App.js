import React from 'react';
import styled from 'styled-components';
import Summary from './john-components/Summary';
import Raw from './john-components/Raw';
import SearchUi from './SearchUi';


const Page = styled.div`
    box-sizing: border-box;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100vh;
	max-height: 100vh;
    background: #d8d8d8;
    line-height: 22px;
    h1{
	    font-size: 24px;
	}
	.col{
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	    &:nth-child(1){
	        flex: .5;
	        background: #c5c4c4;
	    }
	    &:nth-child(2){
	        flex: .5;
	    }
	    h1{
	      padding: 0 10px;
	    }
	}
`;

const App = () => {
  return (
    <Page>
      <Container className="container">
        <div className="col">
          {/*Search-UI area*/}
          <SearchUi />
        </div>
        <div className="col">
            <h1>Summaries</h1>
          <Summary/>
        </div>
        <div className="col">
            <h1>Thread</h1>
            <Raw/>
        </div>
      </Container>
    </Page>
  );
};

export default App;
