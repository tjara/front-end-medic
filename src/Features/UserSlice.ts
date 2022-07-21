import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Store/store'

// Define a type for the slice state
interface userState {
    loading: boolean,
    error: boolean,
    items: object,
}

// Define the initial state using that type
const initialState: userState = {
    loading: false,
    error: false,
    items: {},
}

const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setItems: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.items = payload;
        },
        setError: (state) => {
            state.error = true;
        },
    },
})

export const { setLoading, setItems, setError } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: RootState) => state.user

export default userSlice.reducer