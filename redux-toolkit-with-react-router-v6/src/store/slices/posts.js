import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	data: [],
	error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
	const {
		posts: { data: storedData }
	} = getState();
	const hasPosts = storedData.length > 0;
	if (hasPosts) {
		return storedData;
	}

	const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
	return data;
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchPosts.pending, state => {
			state.loading = true;
		});

		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload.slice(20);
			state.error = '';
		});

		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.loading = false;
			state.data = [];
			state.error = action.error.message;
		});
	}
});

export default postsSlice.reducer;
