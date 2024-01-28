//SPDX-License-Identifier:MIT
pragma solidity ^0.8.8;

contract Voting{

    address public admin;
    uint public voterCount;
    uint16 public candidateCount;
    uint public voted;

    struct voter {
        uint16 voterID;
        address walletAddress;
        bool voted;
        bool exists;
    }

    struct candidate {
        string name;
        uint16 canditID;
        uint voteCount;
        bool exists;
    }

    mapping(uint => voter) voters;
    mapping(uint => candidate) public candidates;

    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin (){
        require(msg.sender == admin , "You dont have the priviledges");
        _;
    }

    event Voted(uint16 voterID, uint16 candidateID);

    function addCandidate(string memory _name) public onlyAdmin {
        candidates[candidateCount] = candidate(_name,candidateCount,0,true);
        candidateCount++;
    }

    function addVoter(uint16 _voterID, address _walletAddress) public onlyAdmin {
        require(voters[_voterID].walletAddress == address(0), "Voter already exists");
        voters[_voterID] = voter(_voterID,_walletAddress,false,true);
        voterCount++;
    }

    function Vote(uint16 _id , uint16 _candidateID, address walletAddress) public {
        require(voters[_id].exists,"User doesnt exist");
        require(!voters[_id].voted,"You have already voted");
        require(walletAddress == voters[_id].walletAddress, "Use your registered wallet");
        voters[_id].voted = true;
        candidates[_candidateID].voteCount++;
        voted++;
        emit Voted(_id,_candidateID);
    }


}