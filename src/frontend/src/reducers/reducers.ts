import { createReducer } from '@reduxjs/toolkit'
import { STPupdateDummy, STPupdateAcct, STPupdateWeb3 } from '../actions/actions'

export interface AppState {
  dummy: string,
  acct:  number,
  web3: object,
}

const initialState: AppState = {
  dummy: 'none',
  acct: 0x0,
  web3: {},
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
    .addCase(STPupdateWeb3, (state , action) => {
      console.log(state.web3)
      console.log(action)
      return {
        ...state,
        web3: action.payload,
      };
    })    
})

export default reducers;