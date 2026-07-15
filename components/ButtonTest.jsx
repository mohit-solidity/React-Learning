import {BrowserProvider, formatEther, parseEther} from "ethers";
import { useState } from "react";

export default function ConnectWallet({onConnect , balance}){
    async function Connect(){
        if(window.ethereum){
            try{
                await window.ethereum.request({method:"eth_requestAccounts"});
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                const userBalance = await provider.getBalance(address);
                balance(formatEther(userBalance));
                onConnect(address);
            }catch(err){
                alert(`Error : ${err.message}`);
            }
        }else{
            alert("Please Install Metamask");
        }
    }
    return(
        <div>
            <button onClick={Connect}>Connect Wallet</button>
        </div>
    )
}