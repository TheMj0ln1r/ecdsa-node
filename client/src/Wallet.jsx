import server from "./server";
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance,totalTransactions, setTotalTransactions }) {
  

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance, numTransactions },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      setTotalTransactions(numTransactions);
    } else {
      setBalance(0);
      setTotalTransactions(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      <div className="balance">Total Transactions: {totalTransactions}</div>
      <div className="balance">Next Nonce: {totalTransactions+1}</div>
    </div>
  );
}

export default Wallet;
