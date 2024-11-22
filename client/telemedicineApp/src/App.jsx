import React, { useEffect, useState } from "react";
import API from "./api/api"; // Import API helper

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Lakukan request ke backend
        API.get("/")
            .then((response) => {
                setMessage(response.data.message); // Set response message
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 className="text-2xl font-bold">{message || "Loading..."}</h1>
        </div>
    );
}

export default App;
