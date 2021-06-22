import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firebase from 'firebase/app'

export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
    const response = await (await firebase.database().ref('/polls').once('value')).val()
    const data = Object.keys(response).map(key => ({
        ...response[key],
    }))
    return data
})

export const createPoll = createAsyncThunk('polls/fetchPolls', async (poll) => {
    await firebase.database().ref(`/polls/${poll.id}`).set({
        ...poll
    })
})

export const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        polls: [],
        loading: false
    },
    reducers: {
        setPolls: (state, action) => {
            state.polls = action.payload
        }
    },
    extraReducers: {
        [fetchPolls.pending]: (state, action) => {
            state.loading = true
        },
        [fetchPolls.fulfilled]: (state, action) => {
            state.loading = false
            state.polls = action.payload
        }
    }
})

export const { setPolls } = pollSlice.actions

export default pollSlice.reducer