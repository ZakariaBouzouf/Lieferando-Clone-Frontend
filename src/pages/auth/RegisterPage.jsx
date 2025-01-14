import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/auth/AuthForm';

export default function RegisterPage() {
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleRegister = async (data) => {
    try {
      register(data)
      // login(response.user);
    } catch (err) {
      setError('Registration failed');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthForm 
        type="register"
        onSubmit={handleRegister}
        error={error}
      />
    </div>
  );
}
