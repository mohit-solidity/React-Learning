import { useState } from 'react';

const initialCreators = [
  { id: 1, name: "Alex", subscribers: 12000, verified: true },
  { id: 2, name: "John", subscribers: 4500, verified: false },
  { id: 3, name: "Sarah", subscribers: 800, verified: true },
  { id: 4, name: "Mike", subscribers: 300, verified: true },
  { id: 5, name: "David", subscribers: 500, verified: false }
];

export default function Creator() {
  const [creators, setCreators] = useState(initialCreators);
  const [name, setName] = useState("");
  const [searchedName, setSearchedName] = useState("");
  const [minimumNumbersToSearch, setMinimumNumbersToSearch] = useState(0);
  const [ranked, setRanked] = useState(false);
  const [showVerified, setShowVerified] = useState(false);
  const toggleShow = ()=> {
    const toggle = !showVerified;
    setShowVerified(toggle);
  }

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

  const rankCreators = () => {
    setCreators((currentCreators) =>
      [...currentCreators].sort(
        (a, b) => b.subscribers - a.subscribers
      )
    );
    setRanked(true);
  };
  const resetRank = ()=> {
    setCreators((creator)=>
      [...creator].sort(
        (a,b)=>a.id - b.id)
    )
    setRanked(false);
  }

  const searchCreator = creators.filter((creator) => {
    const matchesName = creator.name
      .toLowerCase()
      .includes(searchedName.toLowerCase());
    const matchesMinimumSubscribers =
      creator.subscribers >= Number(minimumNumbersToSearch);

    return matchesName && matchesMinimumSubscribers;
  });
  const totalSubscribers = (
    creators.reduce(
      (total,creators)=>total + creators.subscribers,0
    )
  )
  const subscribedTo = (
    creators.filter((creator)=>creator.subscribed).length
  )

  return(
    <>
      <p>Total Creators : {creators.length} </p>
      <p>Total Subscribers : {totalSubscribers} Subscribers</p>
      <p>Subscribed To :  {subscribedTo} Channels</p>
      <h1>Creators</h1>
      <button type="button" disabled={ranked} onClick={rankCreators}>
        Rank by subscribers
      </button>
      <button onClick={resetRank} disabled={!ranked}>Reset Filter</button><br/><br/>
      <label>Search Creator : </label>
      <input type='text' value={searchedName} onChange={(e)=>setSearchedName(e.target.value)} placeholder='Ex: Mohit' /><br/><br/>
      <label>Search By Minimum Subscribers : </label>
      <input type='number' onChange={(e)=>setMinimumNumbersToSearch(e.target.value)} placeholder='Ex: 300' /><br/>
      <button onClick={()=>toggleShow()}>{showVerified?"Show All Creators":"Show Verified Creators"}</button>
      {
        showVerified&&searchCreator.filter((creator)=>creator.verified).map((creator)=>(
          <div
            key={creator.id}
            style={{
              border: '2px solid blue',
              margin: '3px',
              padding: '3px',
            }}
          >
            <h2>Name : {creator.name} {creator.verified?"✅":""}</h2>
            <p>{creator.subscribers} Subscribers</p>
            <button
              type="button"
              style={{ color: creator.subscribed ? 'red' : 'green' }}
              onClick={() => toggleSubscription(creator.id)}
            >
              {creator.subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <button type="button" onClick={() => removeCreator(creator.id)}>
              Delete Creator
            </button>
          </div>
        ))
      }
      {
        !showVerified&&searchCreator.map((creator)=>(
          <div
            key={creator.id}
            style={{
              border: '2px solid blue',
              margin: '3px',
              padding: '3px',
            }}
          >
            <h2>Name : {creator.name} {creator.verified?"✅":""}</h2>
            <p>{creator.subscribers} Subscribers</p>
            <button
              type="button"
              style={{ color: creator.subscribed ? 'red' : 'green' }}
              onClick={() => toggleSubscription(creator.id)}
            >
              {creator.subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <button type="button" onClick={() => removeCreator(creator.id)}>
              Delete Creator
            </button>
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