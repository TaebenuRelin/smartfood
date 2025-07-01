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

  return null;
};

export default UserGreeting;
