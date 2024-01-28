import Web3 from "web3";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
import "dotenv";

const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "voterID",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "candidateID",
        type: "uint16",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_id",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_candidateID",
        type: "uint16",
      },
    ],
    name: "Vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_voterID",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "_walletAddress",
        type: "address",
      },
    ],
    name: "addVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "candidateCount",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "canditID",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voterCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0x351063D4800CCC8f0B656531A224c1D9701104E4";

const web3 = new Web3("https://rpc2.sepolia.org");

const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const account = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/addVoter", async (req, res) => {
  try {
    const voterID = req.query.voterID;
    const walletAddress = req.query.walletAddress;
    const gasPrice = await web3.eth.getGasPrice();
    //const gasPrice = 30000000000;

    const transaction = await myContract.methods
      .addVoter(voterID, walletAddress)
      .send({
        from: account[0].address,
        gasLimit: 3000000,
        gasPrice,
      });

    res
      .status(200)
      .json({ success: true, transactionHash: transaction.transactionHash });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add voter" });
  }
});

app.get("/addCandidate", async (req, res) => {
  try {
    const name = req.query.name;

    const gasPrice = await web3.eth.getGasPrice();

    const transaction = await myContract.methods.addCandidate(name).send({
      from: account[0].address,
      gasLimit: 3000000,
      gasPrice,
    });

    res
      .status(200)
      .json({ success: true, transactionHash: transaction.transactionHash });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add candidate" });
  }
});

app.get("/getCount", async (req, res) => {
  try {
    const voterCount = await myContract.methods.voterCount().call();
    const candidateCount = await myContract.methods.candidateCount().call();
    const voted = await myContract.methods.voted().call();

    const candidateList = [];

    for (let i = 0; i < candidateCount; i++) {
      const candidate = await myContract.methods.candidates(i).call();
      candidateList.push({
        name: candidate.name,
        ID: candidate.canditID.toString(),
        voteCount: candidate.voteCount.toString(),
      });
    }

    res.status(200).json({
      voterCount: voterCount.toString(),
      candidateCount: candidateCount.toString(),
      voted: voted.toString(),
      candidateList: candidateList,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add candidate" });
  }
});

app.get("/vote", async (req, res) => {
  try {
    const voterID = req.query.voterID;
    const candidateID = req.query.candidateID;

    const gasPrice = await web3.eth.getGasPrice();

    const transaction = await myContract.methods
      .Vote(voterID, candidateID)
      .send({
        from: account[0].address,
        gasLimit: 3000000,
        gasPrice,
      });

    res
      .status(200)
      .json({ success: true, transactionHash: transaction.transactionHash });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to add candidate" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
