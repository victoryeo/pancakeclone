import { createReducer } from '@reduxjs/toolkit'
import { STPupdateDummy, STPupdateAcct } from '../actions/actions'

export const initialState = {
  dummy: 'none',
  acct:  0x0,
}

export const reducers = createReducer(initialState, (builder) => {
  builder
    .addCase(STPupdateDummy, (state , action) => {
      console.log(state.dummy)
      console.log(action)
      return {
        ...state,
        dummy: action.payload,
      };
    })
    .addCase(STPupdateAcct, (state , action) => {
      console.log(state.acct)
      console.log(action)
      return {
        ...state,
        acct: action.payload,
      };
    })    
})

export default reducers;