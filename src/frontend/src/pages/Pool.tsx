import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { STPupdateDummy } from '../actions/actions'
import { RootState } from '../reducers'
import { GetCake, GetContract } from '../contracts/getContracts'
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const Pool: React.FC = () => {
  const [pname, setPname] = useState<string|null>(null);
  const [input, setInput] = useState<string>('');
  const dummy:string = useSelector((state: RootState) => state.reducers.dummy)
  let testCake: any
  const acct = useSelector((state: RootState) => state.reducers.acct)
  console.log(acct)
  const history = useHistory();

  const fetchMyCake = (async () => {
    testCake = await GetCake()
    if (testCake != null) {
      let currentVote = await testCake.methods.getOwner().call()
      console.log(currentVote)
      if (acct != undefined) {
        currentVote = await testCake.methods.getCurrentVotes(acct).call()
        console.log(currentVote)
      } 
    } else {
      history.push("/");
    }
  }) 
  fetchMyCake()

  const enableMyCake = (async () => {
    console.log(acct)
    if (testCake != null && acct != undefined) {
      let result = await testCake.methods.approve(acct, 1000).send({from: acct})
      console.log(result)
    }
  })

  useEffect(() => {
    console.log('Pool mounted');
    setPname(dummy)
    return () => console.log('Pool is being removed');
    // the line below is used to fix warning message: React Hook useEffect has a missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch()

  return (
    <Wrapper>
      <h1>
        Syrup Pools
      </h1>
      <h2>
      Just stake some tokens to earn.
      </h2>
      <h2>
      High APR, low risk
      </h2>

      <button onClick={() => {
        console.log(testCake.methods)
        enableMyCake()
      }}>
        Enable Pool
      </button> 
      <p/>
      <div>{pname}</div>
      <input value={input} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
      <button onClick={() => {
        setPname(input)
        dispatch(STPupdateDummy(input))
      }}>
        Update Pool
      </button>
    </Wrapper>
  )

}