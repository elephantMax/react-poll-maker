import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import firebase from 'firebase/app'

export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
    try {
        const response = await (await firebase.database().ref('/polls').once('value')).val()
        const data = Object.keys(response).map(key => ({
            ...response[key],
        })).reverse()
        return data
    } catch (error) {
        return []
    }
})

export const fetchPollById = createAsyncThunk('polls/fetchPollById', async (id) => {
    try {
        const response = await (await firebase.database().ref(`/polls/${id}`).once('value')).val()
        if (!response.user_id) {
            return response
        }
        const user = await (await firebase.database().ref(`/users/${response.user_id}`).once('value')).val()
        return {
            ...response,
            user: user.displayName
        }
    } catch (error) {
        return null
    }
})

export const createPoll = createAsyncThunk('polls/createPoll', async (poll) => {
    try {
        await firebase.database().ref(`/polls/${poll.id}`).set({
            ...poll
        })
        return poll
    } catch (error) {
        return null
    }
})

export const vote = createAsyncThunk('polls/vote', async ({ poll, optionId }) => {
    try {
        const session_id = localStorage.getItem('session_id')

        if (!session_id) {
            throw new Error()
        }

        let hasError = false
        poll.options.forEach(option => {
            if (!option.votes) return

            const alreadyVoted = option.votes.find(item => item.session_id === session_id)
            if (alreadyVoted) hasError = true
        })

        if (hasError) throw new Error('duplicated vote')

        const options = poll.options.map(option => {
            const uniqueSessions = new Set()

            if (option.id === optionId) {
                let filteredVotes = []
                if (option.votes) {
                    filteredVotes = option.votes.filter(item => {
                        if (!uniqueSessions.has(item.session_id)) {
                            uniqueSessions.add(item.session_id)
                            return true
                        }
                        return false
                    })
                }

                const votes = [
                    ...filteredVotes,
                    { session_id }
                ]

                return {
                    ...option,
                    votes
                }
            }
            return option
        });

        await firebase.database().ref(`/polls/${poll.id}/options`).update({
            ...options
        })

        return {
            ...poll,
            options
        }
    } catch (error) {
        throw new Error('duplicated vote')
    }

})

export const pollSlice = createSlice({
    name: 'poll',
    initialState: {
        polls: null,
        poll: null,
        pollsLoading: false,
        pollLoading: false,
        voteLoading: null,
        createLoading: false,
        hasDuplicationError: null
    },
    reducers: {
        setPolls: (state, action) => {
            state.polls = action.payload
        },
        setPoll: (state, action) => {
            state.poll = action.payload
        },
        setVoteLoading: (state, action) => {
            state.voteLoading = action.payload
        },
        setHasDuplicationError: (state, action) => {
            state.hasDuplicationError = action.payload
        }
    },
    extraReducers: {
        [fetchPolls.pending]: (state) => {
            state.polls = []
            if (!state.polls.length) {
                state.loading = true
            }
        },
        [fetchPolls.fulfilled]: (state, action) => {
            state.pollsLoading = false
            state.polls = action.payload
        },
        [fetchPolls.rejected]: (state) => {
            state.loading = false
        },
        [fetchPollById.pending]: (state) => {
            if (!state.poll) state.pollLoading = true
        },
        [fetchPollById.fulfilled]: (state, action) => {
            state.pollLoading = false
            state.hasDuplicationError = false
            state.poll = action.payload
        },
        [fetchPollById.rejected]: (state, action) => {
            state.poll = action.payload
            state.pollLoading = false
        },
        [vote.pending]: (state) => {
            state.voteLoading = true
        },
        [vote.fulfilled]: (state, action) => {
            state.voteLoading = null
            state.polls = state.polls.map(poll => poll.id === action.payload.id ? action.payload : poll)
            state.poll = action.payload
        },
        [vote.rejected]: (state) => {
            state.voteLoading = null
            state.hasDuplicationError = true
        },
        [createPoll.pending]: state => {
            state.createLoading = true
        },
        [createPoll.fulfilled]: (state, action) => {
            state.createLoading = false
            state.polls = [...state.polls, action.payload]
        },
        [createPoll.rejected]: state => {
            state.createLoading = false
        }
    }
})

export const { setPolls, setVoteLoading, setPoll, setHasDuplicationError } = pollSlice.actions

export default pollSlice.reducer