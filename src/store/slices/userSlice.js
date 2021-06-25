import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase/app'
import 'firebase/auth'

export const signIn = createAsyncThunk('users/signIn', async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const { user } = await firebase.auth().signInWithPopup(provider)
        const userData = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            uid: user.uid
        }

        await firebase.database().ref(`/users/${user.uid}`).set({
            ...userData
        })

        return userData
    } catch (error) {
        return null
    }
})

export const logout = createAsyncThunk('users/logout', async () => {
    try {
        await firebase.auth().signOut()
        return null
    } catch (error) {
        return null
    }
})

export const getCurrentUser = createAsyncThunk('users/getCurrentUser', async () => {
    try {
        const user = await firebase.auth().currentUser
        const uid = user.uid || null
        if (uid) {
            const userData = await (await firebase.database().ref(`/users/${uid}`).once('value')).val()
            return userData
        }
        return null
    } catch (error) {
        return null
    }
})



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        loading: false
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: {
        [signIn.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [logout.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [logout.rejected]: (state, action) => {
            state.user = action.payload
        },
        [getCurrentUser.rejected]: (state, action) => {
            state.user = action.payload
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUsers, setUser } = userSlice.actions

export default userSlice.reducer