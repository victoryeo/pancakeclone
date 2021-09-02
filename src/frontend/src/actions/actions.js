import { createAction } from '@reduxjs/toolkit'

export const actionTypes = {
  UPDATE_DUMMY : 'UPDATE_DUMMY',
}

export const STPupdateDummy = createAction(actionTypes.UPDATE_DUMMY)
