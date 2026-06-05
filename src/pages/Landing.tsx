import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#09090B', fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: '#6B63E8',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 24, letterSpacing: '-0.03em' }}>f</span>
        </div>
        <h1 style={{ color: '#FAFAFA', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 10 }}>
          flatpurse
        </h1>
        <p style={{ color: '#71717A', fontSize: 15, marginBottom: 32 }}>
          Business management for modern studios.
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            background: '#6B63E8', color: '#fff', border: 'none',
            borderRadius: 12, padding: '13px 32px', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', letterSpacing: '-0.01em',
          }}
        >
          Get started
        </button>
      </div>
    </div>
  )
}
