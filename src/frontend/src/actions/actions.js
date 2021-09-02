import { createAction } from '@reduxjs/toolkit'

export const actionTypes = {
  UPDATE_DUMMY : 'UPDATE_DUMMY',
  UPDATE_ACCT  : 'UPDATE_ACCT',
}

export const STPupdateDummy = createAction(actionTypes.UPDATE_DUMMY)
export const STPupdateAcct = createAction(actionTypes.UPDATE_ACCT)
