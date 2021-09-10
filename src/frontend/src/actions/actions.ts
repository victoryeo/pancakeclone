import { createAction } from '@reduxjs/toolkit'

export const actionTypes = {
  UPDATE_DUMMY : 'UPDATE_DUMMY',
  UPDATE_ACCT  : 'UPDATE_ACCT',
}

export const STPupdateDummy = createAction<string>(actionTypes.UPDATE_DUMMY)
export const STPupdateAcct = createAction<number>(actionTypes.UPDATE_ACCT)
