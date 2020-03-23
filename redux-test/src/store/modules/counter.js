// Action type
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// Action generation function
export const increment = () => ({type : INCREMENT});
export const decrement = () => ({type : DECREMENT});

// intial status
const initialState = {
	number : 0
};

// reducer : actual action generation part
export default function Counter(state=initialState, action){
	//console.log('in Counter reducer .. ');
	switch(action.type){
		case INCREMENT:
			return {
				...state,
				number: state.number + 1,
			};
		case DECREMENT:
			return {
				...state,
				number : state.number - 1,
			};
		default:
			return state;
	}
}
