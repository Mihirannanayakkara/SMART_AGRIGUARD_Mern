import React, { useEffect, useState } from "react";
import axios from "axios";

const MyInquiriez = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5557/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInquiries(response.data.data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Inquiries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-4 text-left">Plant</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Reply</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq._id} className="border-b">
                <td className="p-4">{inq.plantName}</td>
                <td className="p-4">{inq.issueDescription}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      inq.status === "Pending"
                        ? "bg-yellow-500"
                        : inq.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-600"
                    }`}
                  >
                    {inq.status}
                  </span>
                </td>
                <td className="p-4">{inq.reply || "No reply yet"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyInquiriez;
