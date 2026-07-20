export default function ReceiveArray({Array , onToggleRead}){
    return(
        <div style={{border:"90px solid black" , borderRadius:'3px'}}>
            {Array.map((book,index)=>(
                <div key={book.id} style={{border:'3px solid blue' , borderRadius:'12px' , backgroundColor: book.isRead?'green':'black'}}>
                    <p>Book : {book.title}</p>
                    <p>Written By : {book.author}</p>
                    <p>Readed : {book.isRead?"Yes":"No"}</p>
                    <li key={index}></li>
                    <button onClick={()=>onToggleRead(book.id)}>{book.isRead?"Mark As Un Read":"Mark As Read"}</button>
                </div>
            ))}
        </div>
    )
}