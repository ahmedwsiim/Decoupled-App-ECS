import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateNote from './components/CreateNote';
import NoteGrid from './components/NoteGrid';
import { Notebook } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addNote = async (title, content) => {
    try {
      const response = await axios.post(`${API_URL}/notes`, { title, content });
      setNotes([response.data, ...notes]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>MONOLITH</h1>
        <p className="subtitle">IMMUTABLE TEXT STORAGE</p>
      </header>
      
      <CreateNote onAdd={addNote} />
      
      {loading ? (
        <div className="empty-state">Loading notes...</div>
      ) : (
        <NoteGrid notes={notes} onDelete={deleteNote} />
      )}
    </div>
  );
}

export default App;
