import React, {useEffect, useState, useCallback} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { STPupdateDummy } from '../actions/actions'
import { RootState } from '../reducers'
import { GetCake, GetSousChef } from '../contracts/getContracts'
import { useHistory } from "react-router-dom";
import connectMetamaskWallet from "../web3/connectMetamaskWallet";
import { STPupdateAcct } from '../actions/actions'

const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;

export const Pool: React.FC = () => {
  const [pname, setPname] = useState<string|null>(null);
  const [input, setInput] = useState<string>('');
  const [enableStatus, setEnableStatus] = useState<boolean>(false);
  const dummy:string = useSelector((state: RootState) => state.reducers.dummy)
  let testCake: any
  let testSC: any
  const acct = useSelector((state: RootState) => state.reducers.acct)
  console.log(acct)
  const history = useHistory();
  const dispatch = useDispatch()

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
  
  const fetchSousChef = (async () => {
    testSC = await GetSousChef()
    if (testSC != null) {
      console.log(testSC.methods)
      console.log('souschef loaded')
    } else {
      history.push("/");
    }
  }) 
  fetchSousChef()

  const enableMyCake = (async () => {
    console.log(acct)
    if (testCake != null && acct != undefined) {
      try {
        let tx = await testCake.methods.approve(acct, 1000).send({from: acct})
        console.log(tx)
        if (tx.status === true) {
          console.log('enable success')
          setEnableStatus(true)
        }
      } catch (error: any) {
        console.log(error)
      }
    } else if (acct == undefined || acct == 0) {
      let userAddr: number = await connectMetamaskWallet()
      console.log(userAddr)
      dispatch(STPupdateAcct(userAddr))
    }
  })

  const stakeSousChef = (async () => {
    console.log(acct)
    if (testSC != null && acct != undefined) {
      try {
        let tx = await testSC.methods.deposit(10).send({from: acct})
        console.log(tx)
      } catch (error: any) {
        console.log(error)
      }
    }
  })

  useEffect(() => {
    console.log('Pool mounted');
    setPname(dummy)
    return () => console.log('Pool is being removed');
    // the line below is used to fix warning message: React Hook useEffect has a missing dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let buttonEnable
  let inputBox
  if (enableStatus == true) {
    inputBox=<input value={input} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
    buttonEnable = <button onClick={() => {
      setPname(input)
      dispatch(STPupdateDummy(input))
      stakeSousChef()
    }}>{enableStatus? "Stake Pool": ""}
    </button>
  } else {
    inputBox=''
    buttonEnable = ''
  }

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
        //console.log(testCake.methods)
        enableMyCake()
      }}>
         {acct ? "Enable Pool" : "Connect"}
      </button> 
      <p/>
      {inputBox}
      {buttonEnable}
     
    </Wrapper>
  )

}