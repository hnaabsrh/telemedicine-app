import React, { useEffect, useState } from "react";
import API from "../api/api"; // Import API helper

function AppointmentsPage() {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
    });

    useEffect(() => {
        API.getDoctors()
            .then((data) => setDoctors(data))
            .catch((error) => console.error("Error fetching doctors:", error));

        API.get("/appointments")
            .then((data) => setAppointments(data))
            .catch((error) => console.error("Error fetching appointments:", error));
    }, []);

    const handleCreateAppointment = () => {
        API.createAppointment(newAppointment)
            .then((data) => {
                setAppointments([...appointments, data]);
                setNewAppointment({
                    patient_id: "",
                    doctor_id: "",
                    appointment_date: "",
                });
            })
            .catch((error) => console.error("Error creating appointment:", error));
    };

    const handleUpdateAppointment = (id) => {
        API.updateAppointment(id, newAppointment)
            .then((data) => {
                setAppointments(
                    appointments.map((appointment) =>
                        appointment.id === id ? data : appointment
                    )
                );
            })
            .catch((error) => console.error("Error updating appointment:", error));
    };

    const handleDeleteAppointment = (id) => {
        API.deleteAppointment(id)
            .then(() => {
                setAppointments(appointments.filter((appointment) => appointment.id !== id));
            })
            .catch((error) => console.error("Error deleting appointment:", error));
    };

    return (
        <div className="min-h-screen bg-blue-50 flex flex-col items-center">
            {/* Header */}
            <header className="bg-blue-800 text-white w-full p-6 shadow-md">
                <h1 className="text-3xl font-semibold text-center">Appointments Management</h1>
            </header>

            {/* Content */}
            <div className="max-w-4xl w-full mt-8 px-4">
                {/* Doctors List */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-blue-300">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Doctors List</h2>
                    <ul className="divide-y divide-gray-200">
                        {doctors.map((doctor) => (
                            <li key={doctor.id} className="py-2 text-gray-600">
                                {doctor.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Appointment Form */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-blue-300">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Create Appointment</h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleCreateAppointment();
                        }}
                        className="grid grid-cols-1 gap-6"
                    >
                        <input
                            type="text"
                            placeholder="Patient ID"
                            value={newAppointment.patient_id}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, patient_id: e.target.value })
                            }
                            className="border border-blue-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Doctor ID"
                            value={newAppointment.doctor_id}
                            onChange={(e) =>
                                setNewAppointment({ ...newAppointment, doctor_id: e.target.value })
                            }
                            className="border border-blue-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <input
                            type="datetime-local"
                            value={newAppointment.appointment_date}
                            onChange={(e) =>
                                setNewAppointment({
                                    ...newAppointment,
                                    appointment_date: e.target.value,
                                })
                            }
                            className="border border-blue-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                        >
                            Create Appointment
                        </button>
                    </form>
                </div>

                {/* Appointments List */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-blue-300">
                    <h3 className="text-xl font-bold text-gray-700 mb-4">Appointment List</h3>
                    <ul className="divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <li key={appointment.id} className="py-4 flex justify-between items-center">
                                <div className="text-gray-600">
                                    {`Patient: ${appointment.patient_id}, Doctor: ${appointment.doctor_id}, Date: ${appointment.appointment_date}`}
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateAppointment(appointment.id)}
                                        className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AppointmentsPage;
