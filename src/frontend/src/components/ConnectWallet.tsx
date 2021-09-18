import React, { useState } from "react";
import connectMetamaskWallet from "../web3/connectMetamaskWallet";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'

interface CWProps {
}

interface CWState {
  selectedAddress?: number;
}

export const ConnectWallet: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string|undefined>(undefined);

  const connectWallet = async() => {
    let userAddr
    console.log(selectedAddress)
    if (selectedAddress === undefined) {
      userAddr = await connectMetamaskWallet()
    } 
    console.log(userAddr)
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
            {selectedAddress ? selectedAddress : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );

}