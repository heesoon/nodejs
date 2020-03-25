import React from 'react';
import ProTypes from 'prop-types';
import './Counter.css';

const Counter = ({number, color, onIncrement, onDecrement, onSetColor}) => {
	return(
		<div
			className="Counter"
			onClick={onIncrement}
			onContextMenu={
				(e) => {
					e.preventDefault();
					onDecrement();
				}
			}
			onDoubleClick={onSetColor}
			style={{backGroundColor : color}}>
			{number}
		</div>
	);
};

Counter.propTypes = {
	number: ProTypes.number,
	color: ProTypes.string,
	onIncrement: ProTypes.func,
	onDecrement: ProTypes.func,
	onSetColor: ProTypes.func
};

Counter.defaultProps = {
    number: 0,
    color: 'black',
    onIncrement: () => console.warn('onIncrement not defined'),
    onDecrement: () => console.warn('onDecrement not defined'),
    onSetColor: () => console.warn('onSetColor not defined')
};

export default Counter;
