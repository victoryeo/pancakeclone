import Web3 from 'web3'
import { ganachehost } from './constants'

declare global {
  interface Window {
      ethereum:any;
      web3: any;
  }
}

const getWeb3: Promise<object> = new Promise(resolve => {
  console.log("addEventListener")
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', dispatch => {
    let results: object
    // Metamask no longer injects web3
    //console.log("web3 " + window.web3)
    if (window.ethereum) {
      console.log(window.ethereum)
      // new way of accessing Metamask
      window.web3 = new Web3(window.ethereum)
      // deprecated
      //window.ethereum.enable()
    }
    else {
      console.log("ganache")
      // Fallback to localhost if no web3 injection
      window.web3 = new Web3(new Web3.providers.HttpProvider(ganachehost))
    }
    let { web3 } = window
    results = web3
    
    resolve((results))
  })
})

export default getWeb3
