import React from 'react';
import styled from 'styled-components';
import { useDispatch, useStore } from 'react-redux'
import {
  STPupdateDummy,
 } from '../actions/actions.js'

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

function select(state) { 
  console.log(state.reducers) 
  return state.reducers.dummy
}

export const Pool = () => {
  const dispatch = useDispatch()
  const store = useStore()

  return (<Wrapper>
    <span>{select(store.getState())}</span>
    <button onClick={() => dispatch( STPupdateDummy("test") )}>
      Update Pool
    </button>    
    </Wrapper>)

}