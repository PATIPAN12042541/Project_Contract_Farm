import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      roleID : 1,
    },
    reducers: {
      login : (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.roleID = '1'
      },
      logout: (state,action) => {
        state.username = ''
        state.roleID = ''
      },
    },
  })

  export const loginRole = (state) => state.user.roleID
  
  // Action creators are generated for each case reducer function
  export const { login, logout } = userSlice.actions
  
  export default userSlice.reducer