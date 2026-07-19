import { useEffect, useState } from 'react'
import ReceiveProps from '../components/Test';
import ReceiveArray from '../components/PropsArray';

function App() {
  const arr = ["Mohit","Rohit","Ritika","Gourav","Ankit"]
  const initialBooks = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien", isRead: false },
    { id: 2, title: "Dune", author: "Frank Herbert", isRead: false },
    { id: 3, title: "Foundation", author: "Isaac Asimov", isRead: true },
    { id: 4, title: "Neuromancer", author: "William Gibson", isRead: false },
    { id: 5, title: "Snow Crash", author: "Neal Stephenson", isRead: false }
  ];

  function markAsRead({id}){
    initialBooks.tit
  }
  return(
    <div>
      <ReceiveArray Array={initialBooks} />
    </div>
  )
}

export default App;