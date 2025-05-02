// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Register - Termsheet Validation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" onChange={handleChange} placeholder="Name" required className="w-full px-4 py-2 border rounded" />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="w-full px-4 py-2 border rounded" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="w-full px-4 py-2 border rounded" />
        <select name="role" onChange={handleChange} required className="w-full px-4 py-2 border rounded text-gray-500">
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Login</span>
      </p>
    </div>
  );
};

export default Register;
