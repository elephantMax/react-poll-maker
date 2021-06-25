import { configureStore } from '@reduxjs/toolkit'
import pollSlice from './slices/pollSlice'
import userSlice from './slices/userSlice'

export default configureStore({
    reducer: {
        poll: pollSlice,
        user: userSlice
    }
})
