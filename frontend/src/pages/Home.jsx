import { useEffect } from "react";
import { Header } from "./components/header";
import { fetchBook } from "../api/fetchBook";
import { useState } from "react";

export default function Home() {

    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
            setIsLogin(true)
        }
        fetchBook()
    }, [])

    return (
        <div>
            <Header isLogin={isLogin} />
        </div>
    )
}