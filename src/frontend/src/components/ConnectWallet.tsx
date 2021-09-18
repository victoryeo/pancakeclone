import React, { useState } from "react";
import connectMetamaskWallet from "../web3/connectMetamaskWallet";
import disconnectMetamaskWallet from "../web3/disconnectMetamaskWallet";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'
import { STPupdateAcct } from '../actions/actions'

interface CWProps {
}

interface CWState {
  selectedAddress?: number;
}

export const ConnectWallet: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<number|undefined>(undefined);
  const acct = useSelector((state: RootState) => state.reducers.acct)
  console.log(acct)
  const dispatch = useDispatch()

  const connectWallet = async() => {
    let userAddr
    console.log(selectedAddress)
    if (acct === undefined) {
      userAddr = await connectMetamaskWallet()
    } else {
      userAddr = await disconnectMetamaskWallet()
    }
    console.log(userAddr)
    dispatch(STPupdateAcct(userAddr))
    setSelectedAddress(userAddr)
  }

  return (
    <div className='top'> 
      <div className='right'> 
        <div className="icons">
        </div>

        <div className="btn-main">
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            {acct ? acct : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );

}