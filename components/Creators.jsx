import { useState } from "react";

export default function CreatorsData(){
    const initialCreators = [
        { id: 1, name: 'Mohit', subscribers: 120, subscribed: false },
        { id: 2, name: 'Rohit', subscribers: 450, subscribed: false },
        { id: 3, name: 'Gourav', subscribers: 80, subscribed: false },
    ];
    const [creatorsData, setCreatorData] = useState(initialCreators);
    const [creatorName, setCreatorName] = useState("");

    const setToggle = (id) => {
        setCreatorData((currentCreators)=>
                currentCreators.map((creator)=>{
                if(creator.id!==id) return creator;
                const subscribed = !creator.subscribed;
                return{
                    ...creator,
                    subscribed,
                    subscribers: creator.subscribers + (subscribed?1:-1)
                }
            })
        )
    }

    const addCreator = (event) =>{
        event.preventDefault();
        if(!creatorName) return;
        setCreatorData((currentCreators)=>[
            ...currentCreators,
            {
                id: currentCreators.length + 1,
                name:creatorName,
                subscribers:0,
                subscribed:false
            }
        ])
        setCreatorName("");
    }

    return(
        <>
        {
            creatorsData.map((creator)=>(
                <div style={{border:'2px solid green', margin:'3px'}} key={creator.id}>
                    <p>Craetor Name : {creator.name}</p>
                    <p>Subscribers : {creator.subscribers}</p>
                    <button onClick={()=>setToggle(creator.id)}>{creator.subscribed?"UnSubscribe":"Subscribe"}</button>
                </div>
            ))
        }
        <form onSubmit={addCreator}>
            <input type="text" placeholder="Enter Creator's Name" onChange={(e)=>setCreatorName(e.target.value)} required />
            <button type="submit">Add</button>
        </form>
        </>
    )
}