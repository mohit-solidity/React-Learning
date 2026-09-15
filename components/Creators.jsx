import { useState } from 'react';

const initialCreators = [
  { id: 1, name: 'Alex', subscribers: 120, subscribed: false },
  { id: 2, name: 'John', subscribers: 450, subscribed: false },
  { id: 3, name: 'Sarah', subscribers: 80, subscribed: false },
];

export default function Creator() {
  const [creators, setCreators] = useState(initialCreators);
  const [name, setName] = useState("");

  const toggleSubscription = (id)=> {
    setCreators((currentCreators)=>
      currentCreators.map((creator)=>{
        if(creator.id !== id) return creator;

        const subscribed = !creator.subscribed;
        return{
          ...creator,
          subscribed,
          subscribers: creator.subscribers + (subscribed?1:-1)
        };
      }),
    );
  };

  const addCreator = (event) => {
    event.preventDefault();

    const creatorName = name.trim();
    if (!creatorName) return;

    setCreators((currentCreators) => [
      ...currentCreators,
      {
        id: Date.now(),
        name: creatorName,
        subscribers: 0,
        subscribed: false,
      },
    ]);
    setName("");
  };

  const removeCreator = (id) => {
    setCreators((currentCreators) =>
      currentCreators.filter((creator) => creator.id !== id)
    );
  };
  return(
    <>
      <p>Hello</p>
      <p>creator</p>
      {
        creators.map((creator)=>(
          <div
            key={creator.id}
            style={{
              border: '2px solid blue',
              margin: '3px',
              padding: '3px',
            }}
          >
            <p>Name : {creator.name}</p>
            <p>{creator.subscribers} Subscribers</p>
            <button
              type="button"
              style={{ color: creator.subscribed ? 'red' : 'green' }}
              onClick={() => toggleSubscription(creator.id)}
            >
              {creator.subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <button onClick={()=>removeCreator(creator.id)}>Delete Creator</button>
          </div>
        ))
      }
      <form
        style={{ border: '2px solid green', padding: '4px', margin: '4px' }}
        onSubmit={addCreator}
      >
        <input
          style={{ margin: '3px' }}
          type="text"
          placeholder="Enter Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit">Add Creator</button>
      </form>
    </>
  )
}
