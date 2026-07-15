import { useState } from "react"

export default function Details({address , balance}){

    return(
        <>
            <p>user Address : {address}</p>
            <p>Balance : {balance} ETH</p>
        </>
    )
}