import useUser from "../lib/useUser";
import Router from "next/router";
import {useState} from "react";

export default function MyFilesPage() {

    useUser({redirectTo: '/login', redirectIfFound: false});

    const [logoutError, setLogoutError] = useState("");

    async function logout() {
        const url = 'http://localhost:3000/logout';
        const response = await fetch(url, {
            withCredentials: true,
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data);

        if ('error' in data) {
            setLogoutError(data.error);
        }
    }

    logout();

    return (
        <div>{logoutError}</div>
    )
}