// pages/under-development.js

import Head from 'next/head';

export default function UnderDevelopment() {
  return (
    <div style={containerStyle}>
      <Head>
        <title>Under Development</title>
        <meta name="description" content="Page under development" />
      </Head>
      <div style={contentStyle}>
        <h1>Under Development</h1>
        <p style={textStyle}>We're working on something awesome! Please check back later.</p>
      </div>
    </div>
  );
}

// Inline styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f0f0',
};

const contentStyle = {
  textAlign: 'center',
};

const imageStyle = {
  width: '200px',
  marginBottom: '20px',
};

const textStyle = {
  color: '#333',
};
