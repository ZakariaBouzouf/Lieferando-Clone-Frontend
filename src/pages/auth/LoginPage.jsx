import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/auth/AuthForm';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    try {
      // TODO: Connect to backend API
      const response = await mockLoginApi(data);
      login(response.user);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  // Mock API call - replace with real API
  const mockLoginApi = async (data) => {
    return {
      user: {
        id: '1',
        name: 'John Doe',
        email: data.email,
        role: data.role
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthForm 
        type="login"
        onSubmit={handleLogin}
        error={error}
      />
    </div>
  );
}