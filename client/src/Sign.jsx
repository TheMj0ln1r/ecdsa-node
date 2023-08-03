import { useState } from "react";
import {secp256k1}  from "ethereum-cryptography/secp256k1";
import {keccak256} from "ethereum-cryptography/keccak";
import {utf8ToBytes, toHex} from "ethereum-cryptography/utils";


function Sign({address, sendAmount, setSendAmount, recipient, setRecipient,totalTransactions}){
  const [privKey, setPrivKey] = useState("");
  const [signature, setSignature] = useState("");


  const setValue = (setter) => (evt) => setter(evt.target.value);

  function hashMessage(transaction) {
    return keccak256(utf8ToBytes(transaction));
  }
  async function getSignature(evt) {
    evt.preventDefault();
    try{
      
      const transaction = {sender: address.toLowerCase(), recipient: recipient.toLowerCase(), amount:  parseInt(sendAmount), nonce: totalTransactions + 1}
      let hash = hashMessage(JSON.stringify(transaction));
      const s = secp256k1.sign(hash,privKey);
      setSignature(s);
      console.log(s);
    }
    catch(e){
      console.log(e);
    }
    
    return 
  }

  return (
      <form className="container sign" onSubmit={getSignature}>
        <h1>Sign Transaction</h1>
  
        <label>
          Private Key
          <input placeholder="Type your private key to sign transaction" value={privKey} onChange={setValue(setPrivKey)}></input>
        </label>

        <label>
          From Address
          <input
            placeholder="Your wallet address"
            value={address}
          ></input>
        </label>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Type an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
          ></input>
        </label>
        <label>
          Nonce : {totalTransactions + 1}
        </label>
        <input type="submit" className="button" value="Sign" />

        { 
          signature && 
            (<b> Signature : 
              {JSON.stringify(signature, (_, v) => typeof v === 'bigint' ? `${v}n` : v)}</b>)
        }
      </form>
       
    );
}

export default Sign;