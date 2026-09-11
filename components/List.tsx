export default function ReceiveList({listElements}){
    return(
        <>
            <p>List Items</p>
            <ol style={{border:'2px solid black'}}>
                {listElements.map((ls)=>(
                    <li key={ls.id}>Name : {ls.name} | Role: {ls.role}</li>
                ))}
            </ol>
        </>
    )
}