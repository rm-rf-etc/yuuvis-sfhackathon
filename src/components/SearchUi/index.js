import React from 'react';

const SearchUI = ({ defaultValue = 'Search for stuff!' }) => {
	const [textValue, setSearchValue] = React.useState(defaultValue);
	return (
		<div>
			<input
				type="text"
				value={textValue}
				onChange={({ target }) => { setSearchValue(target.value) }}
			/>
		</div>
	);
};

export default SearchUI;
