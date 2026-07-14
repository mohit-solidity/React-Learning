import {BrowserProvider} from "ethers";
import { useState } from "react";

export default function ConnectWallet(){
    const [userAddress,setUserAddress] = useState("");
    const [useBalance, setUserBalance] = useState(0);
    async function Connect(){
        if(window.ethereum){
            try{
                await window.ethereum.request({method:"eth_requestAccounts"});
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const balance = await provider.getBalance(address);
                setUserAddress(address);
            }catch(err){
                alert(`Error : ${err.message}`);
            }
        }else{
            alert("Please Install Metamask");
        }
    }
    return(
        <div>
            <p>This Works</p>
            <button onClick={Connect}>{userAddress?"Connected":"Connect Wallet"}</button>
            {userAddress && <p>User Address : {userAddress}</p>}
        </div>
    )
}