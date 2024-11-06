"use client"; // Important for using contexts and hooks

import '../styles/global.css';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
