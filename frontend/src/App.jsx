
import React, { useState } from 'react'
import ImportPosts from './components/ImportPosts'
import Dashboard from './components/Dashboard'

export default function App() {
  const [analysis, setAnalysis] = useState(null)

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>MoodLens</h1>
        <p style={styles.subtitle}>Early mental health risk signals from your social media text</p>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <ImportPosts onAnalysis={setAnalysis} />
        </section>
        <section style={styles.section}>
          <Dashboard analysis={analysis} />
        </section>
      </main>

      <footer style={styles.footer}>
        <small>
          Disclaimer: Demo only. Not a medical diagnosis.
        </small>
      </footer>
    </div>
  )
}

const styles = {
  app: {
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#0f172a',
    color: '#e5e7eb',
    padding: '1.5rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: '0.5rem'
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1.2fr',
    gap: '1.5rem',
    alignItems: 'flex-start'
  },
  section: {
    background: '#111827',
    borderRadius: '1rem',
    padding: '1.25rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.35)',
    border: '1px solid #1f2937',
    minHeight: '300px'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#6b7280'
  }
}
