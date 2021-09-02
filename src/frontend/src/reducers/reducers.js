import { createReducer } from '@reduxjs/toolkit'
import { STPupdateDummy } from '../actions/actions'

export const initialState = {
  dummy: 'none',
}

export const reducers = createReducer(initialState, (builder) => {
  builder.addCase(STPupdateDummy, (state , action) => {
    console.log(state.dummy)
    console.log(action)
    return {
      ...state,
      dummy: action.payload,
    };
  })
})

export default reducers;