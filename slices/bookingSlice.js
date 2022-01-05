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
		removeFromBooking: (state, action) => {
			const index = state.items.findIndex(
				(bookingItem) => bookingItem.title === action.payload.title
			);

			let newBooking = [ ...state.items ];

			if (index >= 0) {
				//The item exists in the booking list
				newBooking.splice(index, 1);
			} else {
				console.warn(`Can't remove booking (title: ${action.payload.title})`);
			}

			state.items = newBooking;
		},
	},
});

export const { addToBooking, removeFromBooking } = bookingSlice.actions;

//Selectors = This is how we pull data from the global booking slice
export const selectItems = (state) => state.booking.items;

// Calculate the total
export const selectTotal = (state) => state.booking.items.reduce((total, item) => total + +item.total.match(/\d+/g), 0);

export default bookingSlice.reducer;
