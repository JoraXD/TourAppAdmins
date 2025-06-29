const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const excursionsRef = db.collection('excursions');
const usersRef = db.collection('users');
const customersRef = db.collection('customers');

// Users
app.get('/users', async (req, res) => {
  const snapshot = await usersRef.get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(users);
});

app.post('/users', async (req, res) => {
  const data = req.body;
  const docRef = await usersRef.add(data);
  res.json({ id: docRef.id, ...data });
});

app.get('/users/:id', async (req, res) => {
  const doc = await usersRef.doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).json({ error: 'User not found' });
  } else {
    res.json({ id: doc.id, ...doc.data() });
  }
});

app.put('/users/:id', async (req, res) => {
  const docRef = usersRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'User not found' });
  } else {
    await docRef.update(req.body);
    const updated = await docRef.get();
    res.json({ id: updated.id, ...updated.data() });
  }
});

app.delete('/users/:id', async (req, res) => {
  const docRef = usersRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'User not found' });
  } else {
    await docRef.delete();
    res.json({ message: 'User deleted' });
  }
});

// Excursions
app.get('/excursions', async (req, res) => {
  const snapshot = await excursionsRef.get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(items);
});

app.post('/excursions', async (req, res) => {
  const data = req.body;
  const docRef = await excursionsRef.add(data);
  res.json({ id: docRef.id, ...data });
});

app.get('/excursions/:id', async (req, res) => {
  const doc = await excursionsRef.doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Excursion not found' });
  } else {
    res.json({ id: doc.id, ...doc.data() });
  }
});

app.put('/excursions/:id', async (req, res) => {
  const docRef = excursionsRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Excursion not found' });
  } else {
    await docRef.update(req.body);
    const updated = await docRef.get();
    res.json({ id: updated.id, ...updated.data() });
  }
});

app.delete('/excursions/:id', async (req, res) => {
  const docRef = excursionsRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Excursion not found' });
  } else {
    await docRef.delete();
    res.json({ message: 'Excursion deleted' });
  }
});

// Customers
app.get('/customers', async (req, res) => {
  const snapshot = await customersRef.get();
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(items);
});

app.post('/customers', async (req, res) => {
  const data = req.body;
  const docRef = await customersRef.add(data);
  res.json({ id: docRef.id, ...data });
});

app.get('/customers/:id', async (req, res) => {
  const doc = await customersRef.doc(req.params.id).get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Customer not found' });
  } else {
    res.json({ id: doc.id, ...doc.data() });
  }
});

app.put('/customers/:id', async (req, res) => {
  const docRef = customersRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Customer not found' });
  } else {
    await docRef.update(req.body);
    const updated = await docRef.get();
    res.json({ id: updated.id, ...updated.data() });
  }
});

app.delete('/customers/:id', async (req, res) => {
  const docRef = customersRef.doc(req.params.id);
  const doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).json({ error: 'Customer not found' });
  } else {
    await docRef.delete();
    res.json({ message: 'Customer deleted' });
  }
});

exports.api = functions.https.onRequest(app);
