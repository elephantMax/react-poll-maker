import { configureStore } from '@reduxjs/toolkit'
import pollSlice from './slices/pollSlice'

export default configureStore({
    reducer: {
        poll: pollSlice
    }
})
