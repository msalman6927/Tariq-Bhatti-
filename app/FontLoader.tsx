'use client';
import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(link);
  }, []);
  return null;
}
