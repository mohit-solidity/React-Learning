import { useEffect, useState } from 'react'
import { BrowserProvider, Contract, formatEther , ethers } from 'ethers';
import ConnectWallet from '../components/ButtonTest';
import Details from '../components/UserDetails';
import './App.css';
import abi from './contract/ABI.json';;
import UserMessages from '../components/MainC';

function App() {
  const [userAddress,setUserAddress] = useState("");
  const [userBalance,setUserBalance] = useState(0);
  const [contract,setContract] = useState("");
  const ca = "0x5b61fd589A9AF4459a35c8941d97F4d2db0A5be8";

  async function ConnectUserWallet(provider){
    try{
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const con = new ethers.Contract(ca,abi,signer);
      setContract(con);
      console.log(abi.length)
      console.log(`${abi}`);
      setUserAddress(address);
      setUserBalance(formatEther(balance));
    }catch(err){
      console.log(`Error : ${err.reason || err.message}`);
    }
  }
  useState(()=>{
    async function checkWalletConnection(){
      if(window.ethereum){
        const provider = new BrowserProvider(window.ethereum);
        const account = await provider.send("eth_accounts",[]);

        if(account.length>0){
          await ConnectUserWallet(provider);
        }
      }
    }
    checkWalletConnection();

    if(window.ethereum){
      window.ethereum.on("accountsChanged",(account)=>{
        if(account.length>0){
          const provider = new BrowserProvider(window.ethereum);
          ConnectUserWallet(provider);
        }else{
          setUserAddress("");
          setUserBalance(0);
        }
      })
    }
    return()=>{
      if(window.ethereum){
        window.ethereum.removeAllListeners("accountsChanged")
      }
  }
  },[])

  return (
    <>
      {!userAddress ? <ConnectWallet onConnect={setUserAddress} balance={setUserBalance} />:<Details address={userAddress} balance={userBalance} />}
      {userAddress && <UserMessages contract={contract} address={userAddress} />
      }
    </>
  );
}

export default App;