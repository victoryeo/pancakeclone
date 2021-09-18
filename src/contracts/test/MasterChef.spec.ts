import { ethers, waffle } from "hardhat"
import { assert } from "chai"
import { Contract } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe("MasterChef", function () {
  let cake: Contract, sb: Contract, mc: Contract
  let lp1: Contract
  let minter: SignerWithAddress, dev: SignerWithAddress
  let alice: SignerWithAddress, bob: SignerWithAddress
  const provider = waffle.provider

  beforeEach(async function () {
    [minter, dev, alice, bob] = await ethers.getSigners()

    // CakeToken is a factory for instances of cakeToken contract
    const CakeToken = await ethers.getContractFactory("CakeToken")
    cake = await CakeToken.deploy()
    await cake.deployed()
    // SyrupBar
    const SyrupBar = await ethers.getContractFactory("SyrupBar")
    sb = await SyrupBar.deploy(cake.address)
    await sb.deployed()
    // MasterChef
    const MasterChef = await ethers.getContractFactory("MasterChef")
    mc = await MasterChef.deploy(cake.address, sb.address, dev.address, '1000', '100')
    await mc.deployed()

    const MockBEP20 = await ethers.getContractFactory("MockBEP20")
    lp1 = await MockBEP20.deploy('LPToken', 'LP1', '1000000')
    await lp1.deployed()

    await cake.transferOwnership(mc.address);
    await sb.transferOwnership(mc.address);

    await lp1.connect(minter).transfer(bob.address, '2000')
    await lp1.connect(minter).transfer(alice.address, '2000')
  })
  
  it("test pool length", async function () {
    await mc.connect(minter).add('2000', lp1.address, true);
    //master chef has one default cake pool
    //add another pool, pool length should be 2
    assert.equal((await mc.poolLength()).toString(), "2");
  })

  it('test deposit with block advancement', async () => {
    await mc.connect(minter).add('2000', lp1.address, true)
    for (let i = 0; i < 170; i++) {
      await provider.send("evm_mine",[]);
    }

    await lp1.connect(alice).approve(mc.address, '1000');
    assert.equal((await cake.balanceOf(alice.address)).toString(), '0');
    await mc.connect(alice).deposit(1, '20');
    await mc.connect(alice).withdraw(1, '20');
    assert.equal((await cake.balanceOf(alice.address)).toString(), '750');
  })

})