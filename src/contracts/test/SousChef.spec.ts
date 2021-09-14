import { ethers } from "hardhat"
import { Signer } from "ethers"
import { MockProvider, deployContract } from 'ethereum-waffle'
import { Contract } from 'ethers'
import { assert } from "chai"

import CakeToken from '../../../artifacts/src/contracts/pool/CakeToken.sol/CakeToken.json'
import SousChef from '../../../artifacts/src/contracts/pool/SousChef.sol/SousChef.json'
import SyrupBar from '../../../artifacts/src/contracts/pool/SyrupBar.sol/SyrupBar.json'
import MockBEP20 from '../../../artifacts/src/contracts/pool/libs/MockBEP20.sol/MockBEP20.json'

describe("SousChef", function () {
  let accounts: Signer[]
  const options: any = {
    ganacheOptions: {
      hardfork: 'istanbul',
      mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
      gasPrice: 8000000000,
      gas: 2100000,
      gasLimit: 9999999
    }
  }
  const provider = new MockProvider(options)
  const [wallet, alice, bob, carol] = provider.getWallets()
  let ct: Contract, sb: Contract, sc: Contract
  let mockBEP20: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    ct = await deployContract(wallet, CakeToken, [])
    sb = await deployContract(wallet, SyrupBar, [ct.address])
    sc = await deployContract(wallet, SousChef, [sb.address, 40, 300, 400])

    mockBEP20 = await deployContract(wallet, MockBEP20, ['LPToken', 'LP1', '1000000']);
  })

  it('test', async () => {
    // this will give misleading error below
    // Error: cannot estimate gas; transaction may fail or may require manual gas limit 
    // the actual reason is "the account sending the transaction holds no ether"
    await sb.transfer(bob.address, '1000', { from: wallet.address })
  })

  it('test transfer', async () => {
    let bal = await mockBEP20.balanceOf(wallet.address)
    console.log(bal.toString())
    // transfer from owner to bob using mockBEP20 contract
    await mockBEP20.transfer(bob.address, '1000', { from: wallet.address });
    assert.equal((await mockBEP20.balanceOf(bob.address)).toString(), '1000');
  })

})
