import { ethers } from "hardhat"
import { assert } from "chai"
import { Contract } from "ethers"

describe("CakeToken", function () {
  let ct: Contract
  beforeEach(async function () {
    const CakeToken = await ethers.getContractFactory("CakeToken")
    // CakeToken is a factory for instances of CakeToken contract.
    ct = await CakeToken.deploy()
    await ct.deployed()
  })
  
  it("mint", async function () {
    const [alice] = await ethers.getSigners()
    await ct['mint(address,uint256)'](alice.address, 1000)
    assert.equal((await ct.balanceOf(alice.address)).toString(), '1000')
  })

  it("vote", async function () {
    const [alice, addr1] = await ethers.getSigners()
    //execute a contract's method from another account, use connect
    let vote = await ct.connect(addr1).getCurrentVotes(alice.address)
    console.log(vote.toString())
    assert.equal(vote, 0)
  })
})