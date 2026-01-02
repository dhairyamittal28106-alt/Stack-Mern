const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// ☁️ CLOUD DB CONNECTION
// I fixed the '@' symbol in your password to '%40' so it works.
// I also added '/contact_app' so it creates the folder correctly.
const dbURI = "mongodb+srv://admin:Shyambaba1%40@cluster0.j8epmd0.mongodb.net/contact_app?appName=Cluster0";
// ---------------------------------------------------------

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to Cloud MongoDB"))
    .catch((err) => console.log("❌ Connection Error:", err));

app.get('/api/contacts', async (req, res) => {
    try {
        const allContacts = await Contact.find().sort({ date: -1 });
        res.json(allContacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/contacts', async (req, res) => {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Required fields missing" });
    }
    try {
        const newContact = new Contact({ name, email, phone, message });
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});