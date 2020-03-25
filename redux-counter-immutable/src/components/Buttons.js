import React from 'react';
import ProTypes from 'prop-types';

import './Buttons.css';

const Buttons = ({onCreate, onRemove}) => {
	return(
		<div className="Buttons">
			<div className="btn add" onClick={onCreate}>
				Create
			</div>
			<div className="btn remove" onClick={onRemove}>
				Remove
			</div>
		</div>
	);
};

Buttons.propTypes = {
	onCreare: ProTypes.func,
	onRemove: ProTypes.func
};

Buttons.defaultProps = {
	onCreate : () => console.warn('onCreate not defined'),
	onRemove : () => console.warn('onRemove not defined')
};

export default Buttons;
