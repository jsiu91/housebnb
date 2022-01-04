import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

export const bookingSlice = createSlice({
	name: 'booking',
	initialState,
	reducers: {
		//Actions
		addToBooking: (state, action) => {
			state.items = [ ...state.items, action.payload ];
		},
		removeFromBooking: (state, action) => {},
	},
});

export const { addToBooking, removeFromBooking } = bookingSlice.actions;

//Selectors = This is how we pull data from the global booking slice
export const selectItems = (state) => state.booking.items;

export default bookingSlice.reducer;
