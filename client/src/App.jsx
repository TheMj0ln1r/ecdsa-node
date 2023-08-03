import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Sign from "./Sign";

function App() {
  const [totalTransactions, setTotalTransactions] = useState("")
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  // for transfer and sign
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");


  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        totalTransactions={totalTransactions}
        setTotalTransactions={setTotalTransactions}
      />

      <Sign
        address={address}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        totalTransactions={totalTransactions}
      />
      
      <Transfer 
        setBalance={setBalance} 
        address={address}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recipient={recipient}
        setRecipient={setRecipient}
        totalTransactions={totalTransactions}
        setTotalTransactions={setTotalTransactions}
      />
    </div>
  );
}

export default App;
