import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import {
  STPupdateDummy,
 } from '../actions/actions.js'

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const Pool = () => {
  const [pname, setPname] = useState();
  const [input, setInput] = useState('');
  const dummy = useSelector((state) => state.reducers.dummy)

  useEffect(() => {
    console.log('Pool mounted');
    setPname(dummy)
    return () => console.log('Pool is being removed');
    // the line below is used to fix warning message: React Hook useEffect has a missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch()

  return (<Wrapper>
    <div>{pname}</div>
    <input value={input} onInput={e => setInput(e.target.value)}/>
    <button onClick={() => {
      setPname(input)
      dispatch(STPupdateDummy(input))
    }}>
      Update Pool
    </button>    
    </Wrapper>)

}