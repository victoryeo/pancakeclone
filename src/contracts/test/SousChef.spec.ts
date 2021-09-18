import { ethers, waffle } from "hardhat"
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
  //const provider = waffle.provider;
  const [wallet, alice, bob, carol] = provider.getWallets()
  let ct: Contract, sb: Contract, sc: Contract
  let mockBEP20: Contract

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    ct = await deployContract(wallet, CakeToken, [])
    sb = await deployContract(wallet, SyrupBar, [ct.address])

    mockBEP20 = await deployContract(wallet, MockBEP20, ['LPToken', 'LP1', '1000000']);
    sc = await deployContract(wallet, SousChef, [mockBEP20.address, 40, 300, 400])
  })

  it('test', async () => {
    // this will give misleading error below
    // Error: cannot estimate gas; transaction may fail or may require manual gas limit 
    // the actual reason is "the account sending the transaction holds no ether"
    //await sb.transfer(bob.address, '1000', { from: wallet.address })
  })

  it('test transfer', async () => {
    let bal = await mockBEP20.balanceOf(wallet.address)
    console.log(`balance ${bal.toString()}`)
    // transfer from owner to bob using mockBEP20 contract
    await mockBEP20.transfer(bob.address, '1000');
    assert.equal((await mockBEP20.balanceOf(bob.address)).toString(), '1000');
  })

  it('test deposit', async () => {
    // transfer from owner to bob
    await mockBEP20.transfer(bob.address, '1000');
    assert.equal((await mockBEP20.balanceOf(bob.address)).toString(), '1000');

    await mockBEP20.connect(bob).approve(sc.address, '1000');
    // deposit from bob to SousChef
    await sc.connect(bob).deposit('10');
    assert.equal(
      (await mockBEP20.balanceOf(sc.address)).toString(),
      '10'
    );
  })

  it('test deposit with block advancement', async () => {
    // transfer from owner to bob
    await mockBEP20.transfer(bob.address, '1000');
    assert.equal((await mockBEP20.balanceOf(bob.address)).toString(), '1000');
    // transfer from owner to alice
    await mockBEP20.transfer(alice.address, '1000');
    assert.equal((await mockBEP20.balanceOf(alice.address)).toString(), '1000');

    await mockBEP20.connect(bob).approve(sc.address, '1100');
    await mockBEP20.connect(alice).approve(sc.address, '1100');

    // deposit from bob to SousChef
    await sc.connect(bob).deposit('10');
    
    for (let i = 0; i < 300; i++) {
      await provider.send("evm_mine",[]);
    }

    // deposit from alice to SousChef
    await sc.connect(alice).deposit('30');
    assert.equal(
      (await mockBEP20.balanceOf(sc.address)).toString(),
      '40'
    );
    assert.equal(
      (await sc.pendingReward(bob.address)).toString(),
      '1040'
    );
  })
})
