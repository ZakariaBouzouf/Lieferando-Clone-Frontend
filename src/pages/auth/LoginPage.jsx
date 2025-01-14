import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AuthForm from '../../components/auth/AuthForm';

export default function LoginPage() {
  const { login,error } = useAuth();

  const handleLogin = async (data) => {
    try {
      login(data);
    } catch (err) {
      console.log('error')
    }
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
