import { createAction } from '@reduxjs/toolkit'

export const actionTypes = {
  UPDATE_DUMMY : 'UPDATE_DUMMY',
  UPDATE_ACCT  : 'UPDATE_ACCT',
  UPDATE_WEB3  : 'UPDATE_WEB3',
}

export const STPupdateDummy = createAction<string>(actionTypes.UPDATE_DUMMY)
export const STPupdateAcct = createAction<number>(actionTypes.UPDATE_ACCT)
export const STPupdateWeb3 = createAction<object>(actionTypes.UPDATE_WEB3)