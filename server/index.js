const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");
const {utf8ToBytes} = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const pubKeys = {
  "7bb382dd0bc0f67efd14088b7e9b6442b00c153a": "02bcd94015bb7d21a5651a5b82d83b94eb0425559673699a111fcae9b9bed85517",
  "f8d3eff57a44f86e61190724c823de0c28073828": "02c8b295100339a76a70823ead8500232d9ff00e5627501c2cc076348fb43117f8",
  "c33cddff21d05f7ada70b988bf0004b7c00a2c78": "03e328c0695f092ff786e68b2bf14e1d88fa225412eff89e57d7683ef109413523"
}

const balances = {
  "7bb382dd0bc0f67efd14088b7e9b6442b00c153a": 100,
  "f8d3eff57a44f86e61190724c823de0c28073828": 50,
  "c33cddff21d05f7ada70b988bf0004b7c00a2c78": 75
};

var transactions ={
  "7bb382dd0bc0f67efd14088b7e9b6442b00c153a": 0,
  "f8d3eff57a44f86e61190724c823de0c28073828": 0,
  "c33cddff21d05f7ada70b988bf0004b7c00a2c78": 0,
}


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const numTransactions = transactions[address];
  res.send({ balance, numTransactions });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, nonce } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);
  sign = settingSignature(signature);

  if (nonce != (transactions[sender]+1)){
    return res.status(400).send({message: "No double spend.."});
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    if (verifySign(sender, recipient, amount, sign)){
      balances[sender] -= amount;
      balances[recipient] += amount;
      transactions[sender]++;
      res.status(200).send({ balance: balances[sender], message: "Success", numTransactions: transactions[sender] });
    }
    else{
      res.status(400).send({message: "Invalid signature"})
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function settingSignature(signature){
  const s = JSON.parse(signature, (_, value) => {
    if (typeof value === 'string') {
        const m = value.match(/(-?\d+)n/);
        if (m && m[0] === value) {
            value = BigInt(m[1]);
        }
    }
    return value;
  });
  return s;
}


function verifySign(sender, recipient, amount, signature){
  function hashMessage(transaction) {
    return keccak256(utf8ToBytes(transaction));
  }
  const transaction = {sender: sender.toLowerCase(), recipient: recipient.toLowerCase(), amount:  parseInt(amount), nonce: transactions[sender]+1}
  let hash = hashMessage(JSON.stringify(transaction));
 
  return secp256k1.verify(signature, hash, pubKeys[sender])
}