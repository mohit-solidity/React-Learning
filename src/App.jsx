import { useEffect, useState } from 'react'
import ReceiveProps from '../components/Test';
import ReceiveArray from '../components/PropsArray';
import ReceiveList from '../components/List';

function App() {
  const arr = ["Mohit","Rohit","Ritika","Gourav","Ankit"]
  const[booksData,setBooksData] = useState([
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien", isRead: false },
    { id: 2, title: "Dune", author: "Frank Herbert", isRead: false },
    { id: 3, title: "Foundation", author: "Isaac Asimov", isRead: true },
    { id: 4, title: "Neuromancer", author: "William Gibson", isRead: false },
    { id: 5, title: "Snow Crash", author: "Neal Stephenson", isRead: false },
    {id:30, title:"Pirate Of THe Kingdom" , author:"Spido", isRead:true}
  ]);
  const [users,setUsers] = useState([
    { id: "u1", name: "Alice", role: "Admin" },
    { id: "u2", name: "Bob", role: "User" },
    { id: "u3", name: "Charlie", role: "Moderator" }
  ]);

  const toggleRead = (id) =>{
    setBooksData(booksData=>
      booksData.map((book)=>
        book.id===id?{...book , isRead:!book.isRead}:book
      )
    )
  }

  return(
    <div>
      <ReceiveArray Array={booksData} onToggleRead = {toggleRead}/>
      <ReceiveList listElements={users} />
    </div>
  )
}

export default App;