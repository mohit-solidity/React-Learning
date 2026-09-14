import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Test from '../components/Test';
import "./App.css"
import CreatorsData from '../components/Creators';

function App(){
  const {address, chainId, isConnected, chain} = useAccount();
  return(
    <>
      <h1>Hey Guys</h1>
      {isConnected&&(
        <>
          <p>Address : {address}</p>
          <p>Chain Id : {chainId}</p>
          <p>Chain Name : {chain?.name}</p>
          <Test name={"Mohit"} />
          <CreatorsData />
        </>
      )}
      <ConnectButton label="Sign In To Get Started" showBalance={false} />
    </>
  )
}
export default App;