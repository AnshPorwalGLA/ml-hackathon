
import React, { useState } from 'react'
import axios from 'axios'

export default function ImportPosts({ onAnalysis }) {
  const [rawText, setRawText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    setError('')
    if (!rawText.trim()) {
      setError('Please paste some posts first.')
      return
    }

    const lines = rawText.split('\n').filter(l => l.trim().length > 0)
    const now = new Date()

    const posts = lines.map((line, idx) => ({
      text: line.trim(),
      timestamp: new Date(now.getTime() - (lines.length - idx) * 24 * 60 * 60 * 1000).toISOString()
    }))

    setLoading(true)
    try {
      const res = await axios.post('/api/analyze', { posts })
      onAnalysis(res.data)
    } catch (err) {
      console.error(err)
      setError('Analysis failed. Make sure backend & ML service are running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>1. Import Your Posts</h2>
      <p style={{ color: '#9ca3af', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
        Paste your posts here (one per line). For demo, you can mix positive and negative sentences to see how the risk changes.
      </p>

      <textarea
        style={{
          width: '100%',
          minHeight: '200px',
          borderRadius: '0.75rem',
          padding: '0.75rem',
          background: '#020617',
          color: '#e5e7eb',
          border: '1px solid #1f2937',
          resize: 'vertical'
        }}
        placeholder={`Example:\nI feel really tired and empty lately.\nHad a great time with friends today :)\nNothing seems enjoyable anymore.`}
        value={rawText}
        onChange={e => setRawText(e.target.value)}
      />

      {error && <p style={{ color: '#f87171', marginTop: '0.5rem' }}>{error}</p>}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: '0.75rem',
          padding: '0.6rem 1.1rem',
          borderRadius: '999px',
          border: 'none',
          background: loading ? '#374151' : '#4f46e5',
          color: 'white',
          fontWeight: 600,
          cursor: loading ? 'default' : 'pointer',
          boxShadow: '0 10px 20px rgba(79,70,229,0.4)',
          transition: 'transform 0.1s ease, box-shadow 0.1s ease'
        }}
      >
        {loading ? 'Analyzing…' : 'Analyze Posts'}
      </button>
    </div>
  )
}
