import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tickets.css";

const Tickets = () => {
  const [tickets, setTickets] = useState([]); // To store fetched tickets
  const [loading, setLoading] = useState(true); // To show loading spinner
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchTickets = async () => {
      const user_id = localStorage.getItem("user_id"); // Get user ID from localStorage
      try {
        const response = await fetch(
          `http://localhost:5000/api/tickets/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json(); // Parse the JSON response
        setTickets(data); // Set the fetched tickets to state
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchTickets();
  }, []); // Empty dependency array to run only once on component load

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>Error: {error}</p>;

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "status-green";
      case "closed":
        return "status-red";
      default:
        return "status-yellow";
    }
  };

  return (
    <div className="tickets-page-container">
      <h2>
        Your Tickets{" "}
        <Link
          to="/dashboard/help-and-support"
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Create New Ticket
        </Link>
      </h2>
      <table className="tickets-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket._id}>
              <td>{index + 1}</td>
              <td>{ticket.subject}</td>
              <td>
                <span
                  className={`status-badge ${getStatusClass(ticket.status)}`}
                >
                  {ticket.status}
                </span>
              </td>
              <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary btn-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
