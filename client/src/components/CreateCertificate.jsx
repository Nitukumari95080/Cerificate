import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import "./styles.css"; // Include custom styles for animations or effects

export default function CreateCertificate() {
    const [name, setName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [date, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (date) => {
        if (!date) return "";
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://certificate-automation.onrender.com/certificates/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        course: courseName,
                        date: formatDate(date),
                    }),
                }
            );

            const data = await response.json();
            setName("");
            setCourseName("");
            setDate("");
            if (response.ok) {
                console.log(data);
                toast.success("Certificate created successfully!");
            } else {
                console.error(data);
                toast.error("Some error occurred.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 bg-fixed flex justify-center items-center p-6">
            <div className="bg-gray-50 shadow-xl rounded-lg p-8 w-full max-w-lg animate-fadeIn">
                <form onSubmit={handleSubmit} className="certificate-form">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center animate-fadeUp">
                        Create Certificate
                    </h2>
                    <div className="mb-6 animate-slideIn">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-lg font-semibold text-gray-700">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter the name"
                            required
                        />
                    </div>
                    <div className="mb-6 animate-slideIn delay-200">
                        <label
                            htmlFor="courseName"
                            className="block mb-2 text-lg font-semibold text-gray-700">
                            Course Name:
                        </label>
                        <input
                            type="text"
                            id="courseName"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Enter the course name"
                            required
                        />
                    </div>
                    <div className="mb-6 animate-slideIn delay-400">
                        <label
                            htmlFor="date"
                            className="block mb-2 text-lg font-semibold text-gray-700">
                            Date:
                        </label>
                        <DatePicker
                            id="date"
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            dateFormat="MM/dd/yyyy"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-md text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-300 ${
                            isLoading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:shadow-lg"
                        }`}
                        disabled={isLoading}>
                        {isLoading ? "Creating Certificate..." : "Create Certificate"}
                    </button>
                </form>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}
