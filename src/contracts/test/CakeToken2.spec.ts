import { ethers } from "hardhat"
import { assert } from "chai"

describe("CakeToken", function () {
  it("mint", async function () {
    const CakeToken = await ethers.getContractFactory("CakeToken")
    // CakeToken is a factory for instances of CakeToken contract.
    const ct = await CakeToken.deploy()
    await ct.deployed()

    const [alice] = await ethers.getSigners()
    await ct['mint(address,uint256)'](alice.address, 1000)
    assert.equal((await ct.balanceOf(alice.address)).toString(), '1000')
  })

  it("vote", async function () {
    const CakeToken = await ethers.getContractFactory("CakeToken")
    // CakeToken is a factory for instances of CakeToken contract.
    const ct = await CakeToken.deploy()
    await ct.deployed()

    const [alice, addr1] = await ethers.getSigners()
    let vote = await ct.connect(addr1).getCurrentVotes(alice.address)
    console.log(vote.toString())
    assert.equal(vote, 0)
  })
})