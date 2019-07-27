import React from 'react';
import { connect } from 'react-redux';
import { setSearch } from '../../actions';
import styled from 'styled-components';

const Row = styled.div`
	width: 100%;
`;
const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
`;

const SearchUI = ({ setSearch, searchString, results = [] }) => {

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
			<div>
				<Input
					type="text"
					value={searchString}
					placeholder="Your search query..."
					onChange={({ target }) => setSearch(target.value)}
				/>
			</div>
			<div>
				<ul>{processedResults}</ul>
			</div>
		</Row>
	);
};

const mapStateToProps = (state) => ({
	searchString: state.searchString,
	results: state.results,
});
const mapDispatchToProps = (dispatch) => ({
	setSearch: (str) => dispatch(setSearch({ searchString: str })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUI);
