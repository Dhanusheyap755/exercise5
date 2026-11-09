
import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    session: "",
    feedback: "",
    suggestions: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://exercise5-3dhi.onrender.com/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      alert(data.message);

      setForm({
        name: "",
        department: "",
        session: "",
        feedback: "",
        suggestions: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Backend connection failed! Check server.js and MongoDB.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="feedback-container">
      <h1>Feedback Form</h1>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <label>Session Title:</label>
        <input
          type="text"
          name="session"
          value={form.session}
          onChange={handleChange}
          required
        />

        <label>Feedback:</label>
        <input
          type="text"
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          required
        />

        <label>Suggestions:</label>
        <textarea
          name="suggestions"
          value={form.suggestions}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default App;

