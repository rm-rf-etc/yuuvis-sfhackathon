import React from 'react';
import styled from 'styled-components';
import { searchStringRecord } from '../../store';


const Row = styled.div`
	width: 100%;
`;
const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	font-size: 18px;
	margin-bottom: 20px;
	border: 2px solid gray;
`;
const SearchBox = styled.div`
	background: white;
	padding: 15px;
	.btn-wrapper{
		width: 100%;
		text-align: right;
	}
	.btn{
        padding: 8px 24px;
        color: white;
        font-size: 20px;
        border: none;
        width: 100%;
        max-width: 48%;
        border-radius: 4px;
        display: inline-block;
    }
    .btn-red{
        background: #b53942;
        margin-right: 2%;
    }
    .btn-green{
        background: #50bb31;
    }
`;

const ResultWrap = styled.div`
	h2{
		font-size: 20px;
		text-align: center;
	}
`;

const ResultsList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
	li{
		background: white;
		padding: 10px;
		margin-bottom: 5px;
		opacity: .6;
		&.activeThread{
			opacity: 1;
		}
		h3{
			margin: 0;
			font-size: 20px;
			margin-bottom: 5px;
		}
		p{
			font-size: 16px;
			margin: 0;
		}
	}
`;


const SearchUI = ({ results = [] }) => {

	const [searchString, setSearch] = React.useState('');
	React.useEffect(() => () => {
		searchStringRecord.once((str) => setSearch(str));
	});

	const processedResults = results.reduce((validResults, item) => {
		if (item && item.value) {
			validResults.push(
				<li key={item.value}>{item.value}</li>
			);
		}
		return validResults;
	}, []);

	return (
		<Row>

			<SearchBox>
                <h1>Compendium</h1>
				<Input
					type="text"
					value={searchString}
					placeholder="Your search query..."
					onChange={({ target }) => {
						searchStringRecord.put(target.value);
						setSearch(target.value);
					}}
				/>
				<div className="btn-wrapper">
                    <button className="btn btn-green">Search</button>
				</div>
			</SearchBox>
			<ResultWrap>
				<h2>Results:</h2>
				<ResultsList>
					<li className="activeThread">
						<h3>Thread 1</h3>
						<p>Subject: LEGAL SIGN OFF MEETING - MONDAY, 9TH AUGUST</p>
					</li>
                    <li>
                        <h3>Thread 2</h3>
                        <p>Subject: Meeting Notes 11/28</p>
                    </li>
                    <li>
                        <h3>Thread 3</h3>
                        <p>Subject: Project Proposal</p>
                    </li>
                    <li>
                        <h3>Thread 3</h3>
                        <p>Subject: Business Brainstorm</p>
                    </li>
				</ResultsList>
			</ResultWrap>
		</Row>
	);
};

// const mapStateToProps = (state) => ({
// 	searchString: state.searchString,
// 	results: state.results,
// });
// const mapDispatchToProps = (dispatch) => ({
// 	setSearch: (str) => dispatch(setSearch({ searchString: str })),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(SearchUI);

export default SearchUI;
