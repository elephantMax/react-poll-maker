import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firebase from 'firebase/app'

export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
    try {
        const response = await (await firebase.database().ref('/polls').once('value')).val()
        const data = Object.keys(response).map(key => ({
            ...response[key],
        }))
        return data
    } catch (error) {
        return []
    }
})

export const fetchPollById = createAsyncThunk('polls/fetchPollById', async (id) => {
    try {
        const response = await (await firebase.database().ref(`/polls/${id}`).once('value')).val()
        return response
    } catch (error) {
        return null
    }
})

export const createPoll = createAsyncThunk('polls/createPoll', async (poll) => {
    await firebase.database().ref(`/polls/${poll.id}`).set({
        ...poll
    })
})

export const vote = createAsyncThunk('polls/vote', async ({ poll, optionId }) => {
    try {
        const options =  poll.options.map(option => {
            if(option.id === optionId) {
                return {
                    ...option,
                    votes: option.votes + 1
                }
            }
            return option
        });
        await firebase.database().ref(`/polls/${poll.id}/options`).update({
            ...options
        })
    } catch (error) {
        console.log(error);
    }

})

export const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        polls: [],
        poll: null,
        loading: false,
        voteLoading: null
    },
    reducers: {
        setPolls: (state, action) => {
            state.polls = action.payload
        },
        setVoteLoading: (state, action) => {
            state.voteLoading = action.payload
        }
    },
    extraReducers: {
        [fetchPolls.pending]: (state) => {
            if (!state.polls.length) {
                state.loading = true
            }
        },
        [fetchPolls.fulfilled]: (state, action) => {
            state.loading = false
            state.polls = action.payload
        },
        [fetchPolls.rejected]: (state, action) => {
            state.loading = false
            state.polls = action.payload
        },
        [fetchPollById.pending]: (state) => {
            if (!state.poll) {
                state.loading = true
            }
        },
        [fetchPollById.fulfilled]: (state, action) => {
            state.loading = false
            state.poll = action.payload
        },
        [fetchPollById.rejected]: (state, action) => {
            state.poll = action.payload
            state.loading = false
        },
        [vote.pending]: (state) => {
            state.voteLoading = true
        },
        [vote.fulfilled]: (state) => {
            state.voteLoading = false
        },
        [vote.rejected]: (state) => {
            state.voteLoading = false
        }
    }
})

export const { setPolls, setVoteLoading } = pollSlice.actions

export default pollSlice.reducer