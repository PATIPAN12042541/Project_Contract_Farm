import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        roleID : '',
        loginName : ''
    },
    reducers: {
      login : (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.roleID = action.payload.roleID
        state.loginName = action.payload.loginName
      },
      logout : (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.roleID = ''
        state.loginName = ''
      },
    }
  })


  
  // Action creators are generated for each case reducer function
  export const { login } = userSlice.actions

  export const loginRole = (state) => state.user.roleID
  export const loginName = (state) => state.user.loginName
  
  export default userSlice.reducer