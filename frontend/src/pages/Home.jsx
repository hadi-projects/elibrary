import { useEffect } from "react";
import { Header } from "./components/header";
import { fetchBook } from "../api/fetchBook";

export default function Home() {


    useEffect(()=>{
        fetchBook()
    },[])
    return (
        <div>
            <Header />

        </div>
    )
}