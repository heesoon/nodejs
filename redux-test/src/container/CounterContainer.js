import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component{
	handleIncrement = () => {
		console.log('+++++++++++++++++++++++++++++++++');
		this.props.increment();
	};

	handleDecrement = () => {
		console.log('---------------------------------');
		this.props.decrement();
	};

	render(){
		const { number } = this.props;
		return (
			<Counter
				value={number}
				onIncrement={this.handleIncrement}
				onDecrement={this.handleDecrement}
			/>
		);
	}
}

const mapStateToProps = ({counter}) => ({
	number : counter.number,
});

const mapDispatchToProps = {increment, decrement};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CounterContainer);
