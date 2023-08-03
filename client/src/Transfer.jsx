import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance, sendAmount, setSendAmount, recipient, setRecipient, totalTransactions, setTotalTransactions }) {
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState("")
  const setValue = (setter) => (evt) => setter(evt.target.value);


  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance, message, numTransactions},
      } = await server.post(`send`, {
        sender: address,
        recipient: recipient,
        amount: parseInt(sendAmount),
        signature: signature,
        nonce: totalTransactions + 1
      });

      setBalance(balance);
      setMessage(message);
      setTotalTransactions(numTransactions);
      
    } catch (ex) {
      setMessage(ex.response.data.message);
      alert(ex.response.data.message);      
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>
      
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
        Signature
        <input
          placeholder="Type signature"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>
      {
        message && <b>{message}</b>
      }
      <input type="submit" className="button" value="Transfer" />

    </form>
  );
}

export default Transfer;
