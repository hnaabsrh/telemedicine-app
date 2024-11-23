const API = {
    get: async (url) => {
        const response = await fetch(`http://localhost:4000${url}`);
        return response.json();
    },

    getDoctors: async () => {
        return API.get("/doctors");
    },

    createAppointment: async (data) => {
        const response = await fetch("http://localhost:4000/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    updateAppointment: async (id, data) => {
        const response = await fetch(`http://localhost:4000/appointments/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    deleteAppointment: async (id) => {
        const response = await fetch(`http://localhost:4000/appointments/${id}`, {
            method: "DELETE",
        });
        return response.json();
    },
};

export default API;
