import React, { useState, useEffect } from 'react';
import './App.css';

// ☁️ LIVE API URL (From Render)
const API_BASE = "https://contact-app-backend-z5q3.onrender.com/api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const getContacts = async () => {
    try {
      // Updated to use the variable
      const response = await fetch(API_BASE);
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.log("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      return;
    }
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        getContacts();
        setForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Delete this contact?")) {
      try {
        // Updated to use the variable + ID
        await fetch(`${API_BASE}/${id}`, {
          method: 'DELETE'
        });
        getContacts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const isValid = form.name && form.email && form.phone;

  return (
    <div className="main-container">
      <h1>Contact Manager</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInput}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInput}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInput}
          />
          <textarea
            name="message"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleInput}
          />
          <button type="submit" disabled={!isValid} className={isValid ? "active-btn" : "disabled-btn"}>
            Add Contact
          </button>
        </form>
      </div>

      <div className="list-container">
        <h2>Contacts ({contacts.length})</h2>
        {contacts.length > 0 ? (
          <div className="contact-grid">
            {contacts.map((c) => (
              <div key={c._id} className="contact-card">
                <div className="card-top">
                  <h3>{c.name}</h3>
                  <button onClick={() => deleteContact(c._id)} className="delete-btn">X</button>
                </div>
                <p><strong>Email:</strong> {c.email}</p>
                <p><strong>Phone:</strong> {c.phone}</p>
                {c.message && <p className="msg-text">{c.message}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No contacts yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;