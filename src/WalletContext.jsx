import { createContext, useContext, useEffect, useState } from "react";
import {ethers} from "ethers";

const WalletContext = createContext();

export function WalletProvider({children}){
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [userAddress, setUserAddress] = useState(null);

    const checkWalletConnection = async () => {
        if(!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts",[]);
        if(accounts.length>0){
            const signer = await provider.getSigner();
            setProvider(provider)
            setSigner(signer)
            setUserAddress(accounts[0])
        }
    }

    const connectWallet = async () => {
        if(!window.ethereum){
            alert("Please Connect Wallet")
            return;
        }
        try{
            const provider = new ethers.BrowserProvider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts",[])
            const signer = await provider.getSigner();
            setProvider(provider)
            setSigner(signer)
            setUserAddress(accounts[0])
            alert(`Wallet Connected Successfully To : ${accounts[0]}`)
        }catch(err){
            alert(`Error Connecting : ${err.reason || err.message}`)
        }
    }

    const disconnectWallet = async () => {
        setProvider(null)
        setSigner(null)
        setUserAddress(null)
    }

    useEffect(()=>{
        console.log(`Ethereum : ${window.ethereum}`)
        checkWalletConnection();
        if(!window.ethereum){
            console.log(`No Metamask Found`)
            return;
        }
        const handleAccountsChange = async (accounts) => {
            console.log(`Account Changed : ${accounts}`)
            if(accounts.length === 0){
                setProvider(null)
                setSigner(null)
                setUserAddress(null)
            }else{
                const provider = new ethers.BrowserProvider(window.ethereum)
                await provider.send("eth_accounts",[])
                const signer = await provider.getSigner();
                console.log(`New Account : ${accounts[0]}`)
                setProvider(provider)
                setSigner(signer)
                setUserAddress(accounts[0])
            }
        }
        window.ethereum.on("accountsChanged", handleAccountsChange);
        return()=>{
            console.log(`Closing`)
            window.ethereum.removeListener("accountsChanged", handleAccountsChange)
        }
    },[]);

    return(
        <WalletContext.Provider value={{provider, signer, userAddress, connectWallet, disconnectWallet}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWallet(){
    return useContext(WalletContext);
}