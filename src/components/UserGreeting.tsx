import React, { useState } from "react";

const UserGreeting: React.FC = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "Guest"
  );
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(username);

  const handleSave = () => {
    setUsername(input);
    localStorage.setItem("username", input);
    setEditing(false);
  };

  return (
    <div className="text-right text-sm text-smartfood-700 mb-2">
      {editing ? (
        <span>
          <input
            type="text"
            className="border rounded px-1 text-black"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            autoFocus
          />
          <button onClick={handleSave} className="ml-2 text-xs text-blue-600">
            Simpan
          </button>
        </span>
      ) : (
        <span>
          Halo, <span className="font-semibold">{username}</span>!{" "}
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-blue-600"
          >
            Ganti nama
          </button>
        </span>
      )}
    </div>
  );
};

export default UserGreeting;
