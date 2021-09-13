import { Contract } from "ethers"
import { MockProvider, deployContract } from 'ethereum-waffle'
import { assert } from "chai";
import { ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import CakeToken from '../../../artifacts/src/contracts/pool/CakeToken.sol/CakeToken.json'

describe("CakeToken", function () {
  const provider = new MockProvider()
  const [wallet, alice] = provider.getWallets()
  let token: Contract
  let bob: SignerWithAddress
  let minter: SignerWithAddress

  beforeEach(async function () {
    [bob, minter] = await ethers.getSigners()
    token = await deployContract(wallet, CakeToken, [])
  })

  it('test', async () => {
    //to be added
  })

  it('mint', async () => {
    console.log(alice.address)
    let bal = await token.balanceOf(alice.address)
    console.log(bal.toString())
    console.log(token)
    await token['mint(address,uint256)'](alice.address, 1000);
    assert.equal((await token.balanceOf(alice.address)).toString(), '1000');
  })

})