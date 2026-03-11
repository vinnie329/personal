'use client';

import { useState, useEffect } from 'react';

const DAYS = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function formatClock(now: Date): string {
  const day = DAYS[now.getDay()];
  const month = MONTHS[now.getMonth()];
  const date = now.getDate();
  const yyyy = now.getFullYear();
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  return `${day} ${month} ${date}, ${yyyy} // ${h}:${min}:${sec}`;
}

export default function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(formatClock(new Date()));
    const interval = setInterval(() => {
      setTime(formatClock(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
