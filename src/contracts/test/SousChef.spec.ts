import { ethers } from "hardhat";
import { Signer } from "ethers";
import { MockProvider } from 'ethereum-waffle'

describe("SousChef", function () {
  let accounts: Signer[];
  const provider = new MockProvider()
  const [wallet, other] = provider.getWallets()

  beforeEach(async function () {
    accounts = await ethers.getSigners();
  });

  it('test', async () => {
    //to be added
  })

});
