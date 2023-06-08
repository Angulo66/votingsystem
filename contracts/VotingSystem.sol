// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 votes;
    }
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public hasVoted;

    uint256 candidateCount;

    event Vote(address indexed voter, uint256 indexed candidate);

    constructor(string[] memory _candidateNames) {
        candidateCount = _candidateNames.length;
        for (uint256 i; i < candidateCount; i++) {
            candidates[i] = Candidate({name: _candidateNames[i], votes: 0});
        }
    }

    error UserHasVotedError(address user);
    error InvalidCandidateError(uint256 invalidId);

    function vote(uint256 _candidateId) public {
        if (!hasVoted[msg.sender]) {
            revert UserHasVotedError(msg.sender);
        }
        if (_candidateId > candidateCount) {
            revert InvalidCandidateError(_candidateId);
        }
        candidates[_candidateId].votes++;
        hasVoted[msg.sender] = true;
        emit Vote(msg.sender, _candidateId);
    }
}
