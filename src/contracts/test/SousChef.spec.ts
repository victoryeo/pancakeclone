import { ethers } from "hardhat"
import { Signer } from "ethers"
import { MockProvider, deployContract } from 'ethereum-waffle'
import { Contract } from 'ethers'

import CakeToken from '../../../artifacts/src/contracts/pool/CakeToken.sol/CakeToken.json'
import SousChef from '../../../artifacts/src/contracts/pool/SousChef.sol/SousChef.json'
import SyrupBar from '../../../artifacts/src/contracts/pool/SyrupBar.sol/SyrupBar.json'

describe("SousChef", function () {
  let accounts: Signer[]
  const provider = new MockProvider()
  const [wallet, other] = provider.getWallets()
  let ct, sb, sc: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    ct = await deployContract(wallet, CakeToken, [])
    sb = await deployContract(wallet, SyrupBar, [ct.address])
    sc = await deployContract(wallet, SousChef, [sb.address, 40, 300, 400])
  })

  it('test', async () => {
    //to be added
  })

})
