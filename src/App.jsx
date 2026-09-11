import { useEffect, useState } from 'react'
import { BrowserProvider, Contract, formatEther , ethers } from 'ethers';
import './App.css';
import { useWallet } from './WalletContext';

function App() {
  const {userAddress, connectWallet, disconnectWallet} = useWallet();
  return (
    <>
      <p>This Is My Website</p>
      <h1>Hello Guys</h1>
      {
        userAddress?(
          <>
            <p>Connected To : {userAddress}</p>
            <button onClick={disconnectWallet}>Disconnect</button>
          </>
        ):(
          <button onClick={connectWallet}>Connect Wallet</button>
        )
      }
    </>
  );
}

export default App;