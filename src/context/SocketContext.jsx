import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from 'socket.io-client';
import { toast } from "sonner";
import { acceptOrder, declineOrder } from "../api/OrdersApi";

const SocketContext = createContext()

export function useSockect() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProv')
  }
  return context;
}

export function SocketProvider({ children }) {
  const [notification, setNotification] = useState("")
  const socketRef=useRef(null)

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000/restaurant_notifications', { reconnection: true });
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('new_order', (data) => {
      console.log('New order received:', data);
      toast(`You have a new order.\nClient : ${data.customer}, Total : ${data.total} ,Address:${data.street}`, {
        action:  {
          label: 'Accept',
          onClick:async () => await acceptOrder(data.order_id,data)
        },
        cancel: {
          label: 'Decline',
          onClick: async () => await declineOrder(data.order_id,data)
        },
        className: 'bg-red-100',
      })
      // Handle the notification (e.g., update state, show a toast)
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <SocketContext.Provider value={{ notification , socket:socketRef.current}}>
      {children}
    </SocketContext.Provider>
  )
}
