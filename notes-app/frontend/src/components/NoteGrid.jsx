import React from 'react';
import { FileText, Trash2 } from 'lucide-react';

function NoteGrid({ notes, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state brutal-panel">
        <FileText className="empty-icon" />
        <h2>No notes yet</h2>
        <p>Your beautiful thoughts will appear here.</p>
      </div>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note, index) => (
        <div 
          key={note.id} 
          className="note-card brutal-panel"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {note.title && <h3>{note.title}</h3>}
          <p>{note.content}</p>
          <div className="note-footer">
            <span className="note-date">
              {new Date(note.created_at).toLocaleDateString(undefined, { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <button 
              className="btn-delete" 
              onClick={() => onDelete(note.id)}
              aria-label="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteGrid;
