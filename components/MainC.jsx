import { useState } from "react"

export default function UserMessages({contract,address,readContract}){
    const [userMessage,setuserMessage] = useState("");
    const [newMessage,setNewMessge] = useState("");
    const [pastMessages,setPastMessages] = useState([]);
    useState(()=>{
        async function checkPastMessages(){
            const message = await contract.seeMessage(address);
            setuserMessage(message);
            const filter = readContract.filters.MessapeSaved();
            const readBlock = 11290000;
            const events = await contract.queryFilter(filter,readBlock,"latest");
            const formattedData  = events.map((event)=>({
                user: event.args._user,
                message: event.args._message
            }));
            setPastMessages(formattedData);
        }
        checkPastMessages();
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
            <p>Past Messages : </p>
            {pastMessages.map((msg,index)=>(
                <div key={index}>
                    <p>Sender : {msg.user}</p>
                    <p>Message : {msg.message}</p>
                </div>
            ))}
        </div>
    )
}