import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';

function CreateNote({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onAdd(title, content);
    setTitle('');
    setContent('');
    setIsExpanded(false);
  };

  // Close form when clicking outside (optional UX enhancement)
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        if (!title && !content) {
          setIsExpanded(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title, content]);
  


  return (
    <form 
      ref={formRef}
      className="create-note-form brutal-panel" 
      onSubmit={handleSubmit}
      onClick={() => setIsExpanded(true)}
    >
      {isExpanded && (
        <input
          className="input-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      )}
      <textarea
        className="textarea-field"
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={isExpanded ? 3 : 1}
      />
      {isExpanded && (
        <div className="form-actions">
          <button type="submit" className="btn" disabled={!title.trim() && !content.trim()}>
            <Plus className="btn-icon" /> Add Note
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateNote;
