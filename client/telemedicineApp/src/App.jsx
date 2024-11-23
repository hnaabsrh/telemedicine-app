import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppointmentsPage from "./pages/AppointmentsPage"; // Import halaman janji temu

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AppointmentsPage />} />
                    {/* Route lainnya jika ada halaman lain */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
