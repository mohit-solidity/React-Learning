import { useState } from "react"

export default function UserMessages({contract,address,readContract}){
    const [userMessage,setuserMessage] = useState("");
    const [newMessage,setNewMessge] = useState("");
    const [pastMessages,setPastMessages] = useState([]);
    useState(()=>{
        if(!contract || !readContract) return;
        async function checkPastMessages(){
            const message = await contract.seeMessage(address);
            setuserMessage(message);
            const filter = readContract.filters.MessapeSaved();
            const readBlock = 11298000;
            const events = await readContract.queryFilter(filter,readBlock,"latest");
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
            const ok = confirm("You Already Have Your Message Engraved.\nConfirm Changing?")
            if(!ok) return;
        }
        try{
            const tx = await contract.createMessage(newMessage);
            alert("Transaction Processing. Please Wait!")
            await tx.wait();
            const msg = await contract.message(address);
            setuserMessage(msg);
            alert("Transaction Successful\nYour Message is Encraved")
        }catch(err){
            alert(`Error : ${err.reason||err.message}`)
        }
    }
    return(
        <div style={{border : '3px solid green'}}>
            <input type="text" onChange={(e)=>setNewMessge(e.target.value)} placeholder="Enter your Message" /><br/>
            <button onClick={writeMessage}>Crave Your Message</button>
            <p>User Message Encraved On Blockchain : {userMessage || "None"}</p><br/><br/>
            <p>Past Messages : </p>
            {pastMessages.map((msg)=>(
                <div key={msg.user} style={{border:'2px solid blue' , padding:'3px' , color:"red" , margin:'5px' , borderRadius:'30px'}}>
                    <p>Sender : {msg.user}</p>
                    <p>Message : {msg.message}</p>
                </div>
            ))}
        </div>
    )
}