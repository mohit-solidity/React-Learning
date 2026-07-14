import { useState } from 'react'
import Add from '../components/Add';
import ConnectWallet from '../components/ButtonTest';
import './App.css'


function App() {

  return(
    <>
      <p>Hello</p>
      <Add name={"React"} />
      <Add name={"Hardhat"} />
      <ConnectWallet />
    </>
  );
}
export default App
