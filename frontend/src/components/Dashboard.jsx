
import React from 'react'

export default function Dashboard({ analysis }) {
  if (!analysis) {
    return (
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <p style={{ color: '#9ca3af' }}>
          Run an analysis to see your risk scores, trends, and explanation here.
        </p>
      </div>
    )
  }

  const badgeColor = {
    low: '#22c55e',
    medium: '#eab308',
    high: '#ef4444'
  }[analysis.overall_risk_level] || '#6b7280'

  return (
    <div>
      <h2 style={{ marginBottom: '0.75rem' }}>2. Your Mental Health Signals</h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}
      >
        <div style={cardStyle}>
          <p style={cardLabel}>Overall Risk</p>
          <p style={{ fontSize: '1.6rem', fontWeight: 700 }}>
            <span
              style={{
                padding: '0.2rem 0.75rem',
                borderRadius: '999px',
                background: '#020617',
                border: `1px solid ${badgeColor}`,
                color: badgeColor,
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '0.06em'
              }}
            >
              {analysis.overall_risk_level}
            </span>
          </p>
        </div>

        <div style={cardStyle}>
          <p style={cardLabel}>Depression Risk Score</p>
          <p style={cardValue}>{analysis.depression_risk_score.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <p style={cardLabel}>Anxiety Risk Score</p>
          <p style={cardValue}>{analysis.anxiety_risk_score.toFixed(2)}</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p style={cardLabel}>Summary</p>
        <p style={{ fontSize: '0.95rem', color: '#e5e7eb' }}>{analysis.explanation}</p>
      </div>

      <div>
        <p style={cardLabel}>Timeline (most recent posts)</p>
        <div
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            paddingRight: '0.25rem',
            marginTop: '0.35rem'
          }}
        >
          {analysis.time_series.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.5rem 0.6rem',
                borderRadius: '0.75rem',
                background: '#020617',
                border: '1px solid #1f2937',
                marginBottom: '0.4rem',
                fontSize: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <span style={{ color: '#9ca3af' }}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <span style={{ color: '#22c55e' }}>
                  sentiment: {item.sentiment_score.toFixed(2)} · risk: {item.risk_score.toFixed(2)}
                </span>
              </div>
              <div style={{ color: '#e5e7eb' }}>{item.text_preview}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#020617',
  borderRadius: '0.75rem',
  padding: '0.75rem 0.9rem',
  border: '1px solid #1f2937',
  minWidth: '140px'
}

const cardLabel = {
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#6b7280',
  marginBottom: '0.25rem'
}

const cardValue = {
  fontSize: '1.4rem',
  fontWeight: 700
}
