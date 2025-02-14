import { createSlice } from '@reduxjs/toolkit'

const initialState = { isloggedIn: false, userInfo: null, userToken: null, success: null }

const userSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {

      login(state, action) {
         state.isloggedIn = true,
            state.userInfo = action?.payload?.data?.user,
            state.userToken = action?.payload?.data?.token,
            state.success = true

      },

      logout(state) {
         state.isloggedIn = false,
            state.userInfo = null,
            state.userToken = null,
            state.success = null
         localStorage.clear();
      }
   },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer