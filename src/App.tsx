import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Test from '../components/Test';
import "./App.css"
import CreatorsData from '../components/Creators';
import { formatUnits, parseUnits } from 'viem';

function App(){
  const valuew = BigInt(15774647887323943);
  const toNumber = formatUnits((  valuew),18);
  const parse = parseUnits(toNumber,18);
  const {address, chainId, isConnected, chain} = useAccount();
  return(
    <>
    <h1>Simple : {valuew}</h1>
    <h1>Number : {toNumber}</h1>
    <h1>Parsing : {parse}</h1>
      <h1>Hey Guys</h1>
      <ConnectButton label="Sign In To Get Started" showBalance={false} />
      <CreatorsData />
      {isConnected&&(
        <>
          <p>Address : {address}</p>
          <p>Chain Id : {chainId}</p>
          <p>Chain Name : {chain?.name}</p>
          <Test name={"Mohit"} />
        </>
      )}
    </>
  )
}
export default App;