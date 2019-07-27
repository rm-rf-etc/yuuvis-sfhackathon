import React from 'react';
import styled from 'styled-components';
import Summary from './john-components/Summary';
import Raw from './john-components/Raw';
import SearchUi from './SearchUi';

const Page = styled.div`
    padding: 20px;
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	border: 2px solid gray;
	.col{
	    flex: 1;
	    border-right: 1px solid gray;
	    &:nth-child(3){
            border-right: 0;
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
                  {/*Summary display area*/}
                  <Summary/>
              </div>
              <div className="col">
                  {/*Raw Document display area*/}
                  <Raw/>
              </div>
          </Container>
      </Page>
  );
};

export default App;
