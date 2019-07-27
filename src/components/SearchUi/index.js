import React from 'react';
import { connect } from 'react-redux';
import { setSearch } from '../../actions';

const SearchUI = ({ setSearch, searchString }) => {
	return (
		<div>
			<input
				type="text"
				value={searchString}
				placeholder="Your search query..."
				onChange={({ target }) => setSearch(target.value)}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	searchString: state.searchString,
});
const mapDispatchToProps = (dispatch) => ({
	setSearch: (str) => dispatch(setSearch({ searchString: str })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUI);
