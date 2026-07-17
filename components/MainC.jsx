import { useState } from "react"

export default function UserMessages({contract,address}){
    const [userMessage,setuserMessage] = useState("");
    const [newMessage,setNewMessge] = useState("");
    useState(()=>{
        async function checkMessages(){
            const message = await contract.seeMessage(address);
            setuserMessage(message);
        }
        checkMessages();
    })
    async function writeMessage(){
        if(userMessage){
            confirm("You Already Have Your Message Engraved.\nConfirm Changing?")
        }
        const tx = await contract.createMessage(newMessage);
        await tx.wait();
        const msg = await contract.message(address);
        setuserMessage(msg);
        alert("Transaction Successful\nYour Message is Encraved")
    }
    return(
        <div style={{border : '3px'}}>
            <input type="text" onChange={(e)=>setNewMessge(e.target.value)} placeholder="Enter your Message" /><br/>
            <button onClick={writeMessage}>Crave Your Message</button>
            <p>User Message Encraved On Blockchain : {userMessage || "None"}</p>
        </div>
    )
}