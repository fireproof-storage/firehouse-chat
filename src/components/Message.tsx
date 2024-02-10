import React from 'react';

interface MessageProps {
  message: string;
  created: number;
}

const styles = {
  listItem: {
    listStyleType: 'none',
    margin: '10px 0',
  },
  message: {
    fontSize: '16px',
    color: '#333',
  },
  date: {
    fontSize: '12px',
    color: '#999',
  },
};

const Message: React.FC<MessageProps> = ({ message, created }) => {
  const date = new Date(created);
  return (
    <li style={styles.listItem}>
      <p style={styles.message}>{message}</p>
      <small style={styles.date}>{date.toLocaleString()}</small>
    </li>
  );
};

export { Message };