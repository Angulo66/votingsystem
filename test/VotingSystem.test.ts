import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';
import 'hardhat-gas-reporter';

describe('*** Voting System Tests ***', function () {
  let votingSystem: any;
  let deployer: any;
  let bob: any;
  let cris: any;

  this.beforeAll(async () => {
    deployer = (await ethers.getSigners())[0];
    bob = (await ethers.getSigners())[1];
    cris = (await ethers.getSigners())[2];

    const VotingSystem = await ethers.getContractFactory('VotingSystem');
    votingSystem = await VotingSystem.deploy(['A', 'B', 'C']);
    await votingSystem.deployed();
    console.log('Voting System Deployed');
  });
  describe('**  **', function () {
    it('deployer vote', async function () {
      const hasVoted = await votingSystem.hasVoted(deployer.address);
      await votingSystem.vote(1);
    });
    it('deployer already voted', async function () {
      await expect(votingSystem.vote(0)).to.be.revertedWith(
        'UserHasVotedError("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")'
      );
    });
    it('bob vote', async function () {
      const hasVoted = await votingSystem.hasVoted(deployer.address);
      await votingSystem.connect(bob).vote(1);
    });
    it('cris vote', async function () {
      const hasVoted = await votingSystem
        .connect(cris)
        .hasVoted(deployer.address);
      await votingSystem.connect(cris).vote(1);
    });
    it('cris already voted', async function () {
      await expect(votingSystem.connect(cris).vote(0)).to.be.revertedWith(
        'UserHasVotedError("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")'
      );
    });
    it('get candidate votes', async function () {
      const candidateA = await votingSystem.candidates(0);
      console.log('candidateA', candidateA.votes);
      const candidateB = await votingSystem.candidates(1);
      console.log('candidateA', candidateB.votes);
      const candidateC = await votingSystem.candidates(2);
      console.log('candidateA', candidateC.votes);
    });
  });
});
