export default function ReceiveArray({Array}){
    return(
        <div style={{border:"90px solid black" , borderRadius:'3px'}}>
            {Array.map((book)=>(
                <div key={book.id} style={{border:'3px solid blue' , borderRadius:'12px' , backgroundColor: book.isRead?'green':'black'}}>
                    <p>Book : {book.title}</p>
                    <p>Written By : {book.author}</p>
                    <p>Readed : {book.isRead?"Yes":"No"}</p>
                </div>
            ))}
        </div>
    )
}