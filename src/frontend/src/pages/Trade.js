import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const Trade = () => {
  const acct = useSelector((state) => state.reducers.acct)
  console.log(acct)
  return (
    <Wrapper>
      <h2>Trade</h2>
      <div>{acct}</div>
    </Wrapper>
  )
}