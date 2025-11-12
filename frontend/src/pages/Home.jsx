import { useEffect } from "react";
import { Header } from "./components/header";
import { fetchBook } from "../api/fetchBook";
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token') || localStorage.getItem('token') === '') {
            navigate('/login')
        }
        fetchBook()
    }, [])

    return (
        <div>
            <Header />

        </div>
    )
}