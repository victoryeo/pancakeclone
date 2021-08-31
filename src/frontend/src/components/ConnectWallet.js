import React from "react";
import swaplogo from '../assets/theswap.png'

export class ConnectWallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: null
    }
  }

  changeAddress = (address) => {
    this.setState({
      selectedAddress: address
    })
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
              onClick={this.props.connectWallet}
            >
              {this.state.selectedAddress ? this.state.selectedAddress : "Connect"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}