import { useState } from 'react'
import ConnectWallet from '../components/ButtonTest';
import './App.css'


function App() {
  const [userAddress,setUserAddress] = useState("");
  return(
    <>
      {!userAddress && <ConnectWallet onConnect={setUserAddress}/>}
      {userAddress && <p>Wallet Is Connected After Showing And Address  : {userAddress}</p>}
    </>
  );
}
export default App
