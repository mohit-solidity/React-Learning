import { useEffect, useState } from 'react'
import { BrowserProvider, formatEther } from 'ethers';
import ConnectWallet from '../components/ButtonTest';
import Details from '../components/UserDetails';
import './App.css'

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);

  // 1. Core function to fetch and set wallet data
  async function connectWalletLogic(provider) {
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const rawBalance = await provider.getBalance(address);
      
      setUserAddress(address);
      setUserBalance(formatEther(rawBalance));
    } catch (error) {
      console.error("Error setting wallet data:", error);
    }
  }

  // 2. Check connection state silently on mount
  useEffect(() => {
    async function checkExistingConnection() {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        
        // eth_accounts checks silently without opening the MetaMask popup!
        const accounts = await provider.send("eth_accounts", []);
        
        if (accounts.length > 0) {
          console.log("Found an authorized account:", accounts[0]);
          // Re-fetch the values to log the user right back in
          await connectWalletLogic(provider);
        }
      }
    }

    checkExistingConnection();

    // 3. Listen for account changes (like logging out or switching accounts)
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          // If they swapped accounts, reload the provider data
          const provider = new BrowserProvider(window.ethereum);
          connectWalletLogic(provider);
        } else {
          // If they disconnected completely, clear the state
          setUserAddress("");
          setUserBalance(0);
        }
      });
    }

    // Clean up event listener when component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);

  return (
    <>
      {!userAddress && <ConnectWallet onConnect={setUserAddress} balance={setUserBalance} />}
      {userAddress && <Details address={userAddress} balance={userBalance} />}
    </>
  );
}

export default App;