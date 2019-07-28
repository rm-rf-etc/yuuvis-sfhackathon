import React from 'react';
import styled from 'styled-components';
import { searchStringRecord } from '../../store';


const Row = styled.div`
	width: 100%;
`;
const Input = styled.input`
	width: 100%;
	box-sizing: border-box;
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
			<div>
				<Input
					type="text"
					value={searchString}
					placeholder="Your search query..."
					onChange={({ target }) => {
						searchStringRecord.put(target.value);
						setSearch(target.value);
					}}
				/>
			</div>
			<div>
				<ul>{processedResults}</ul>
			</div>
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
