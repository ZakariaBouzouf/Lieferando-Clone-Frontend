import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const RestaurantNotifications = () => {
  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/restaurant_notifications', { reconnection: true });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('new_order', (data) => {
      console.log('New order received:', data);
      // Handle the notification (e.g., update state, show a toast)
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">Listening for restaurant notifications...</div>;
};

export default RestaurantNotifications;

