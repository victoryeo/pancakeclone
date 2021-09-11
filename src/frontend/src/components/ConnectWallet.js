import React from "react";
import connectMetamaskWallet from "../web3/connectMetamaskWallet";

export class ConnectWallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: undefined
    }
  }

  changeAddress = (address) => {
    this.setState({
      selectedAddress: address
    })
  }

  connectWallet = async() => {
    let userAddr
    console.log(this.state.selectedAddress)
    if (this.state.selectedAddress === undefined) {
      userAddr = await connectMetamaskWallet()
    } 
    console.log(userAddr)
    this.setState({selectedAddress: userAddr})
  }

  render() {
    return (
      <div className='top'> 
        
        <div className='right'> 
          <div className="icons">

          </div>

          <div className="btn-main">
            <button
              className="btn btn-warning"
              type="button"
              onClick={this.connectWallet}
            >
              {this.state.selectedAddress ? this.state.selectedAddress : "Connect"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}