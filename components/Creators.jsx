import { useState } from "react";

export default function CreatorsData(){
    const initialCreators = [
        { id: 1, name: 'Mohit', subscribers: 120, subscribed: false },
        { id: 2, name: 'Rohit', subscribers: 450, subscribed: false },
        { id: 3, name: 'Gourav', subscribers: 80, subscribed: false },
    ];
    const [creatorsData, setCreatorData] = useState(initialCreators);

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

    return(
        <>
        {
            creatorsData.map((creator)=>(
                <div style={{border:'2px solid green', margin:'3px'}}>
                    <p>Craetor Name : {creator.name}</p>
                    <p>Subscribers : {creator.subscribers}</p>
                    <button onClick={()=>setToggle(creator.id)}>{creator.subscribed?"UnSubscribe":"Subscribe"}</button>
                </div>
            ))
        }
        </>
    )
}