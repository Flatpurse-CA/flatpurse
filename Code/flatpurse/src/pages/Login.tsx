import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const C = {
  bg: '#09090B',
  surface: '#141417',
  surface2: '#1C1C21',
  border: '#27272A',
  accent: '#6B63E8',
  accentHover: '#5B52D8',
  text: '#FAFAFA',
  muted: '#71717A',
  subtle: '#3F3F46',
  error: '#F87171',
}

const steps = [
  { n: 1, label: 'Sign in to your account' },
  { n: 2, label: 'View your daily brief & bookings' },
  { n: 3, label: 'Let AutoPilot run your growth' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate('/app', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: C.bg,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* ── Left panel ─────────────────────────────────────────────── */}
      <div
        style={{
          width: '45%',
          minWidth: 420,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '48px 44px',
          overflow: 'hidden',
          borderRadius: '0 0 0 0',
        }}
      >
        {/* Gradient background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 60% 10%, #7C3AED 0%, #4C1D95 35%, #1A0A2E 65%, #09090B 100%)',
          borderRadius: 20,
          margin: 12,
        }} />
        {/* Noise texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          margin: 12, borderRadius: 20,
        }} />

        {/* Logo */}
        <div style={{ position: 'absolute', top: 44, left: 44, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em' }}>f</span>
          </div>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>flatpurse</span>
        </div>

        {/* Bottom content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
            Business Management
          </p>
          <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 36 }}>
            Run your business<br />on autopilot.
          </h2>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: i === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 14,
                  padding: '14px 18px',
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: i === 0 ? '#09090B' : 'rgba(255,255,255,0.15)',
                  color: i === 0 ? '#fff' : 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {s.n}
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 500,
                  color: i === 0 ? '#09090B' : 'rgba(255,255,255,0.7)',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ─────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>
          <h1 style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 8 }}>
            Sign In Account
          </h1>
          <p style={{ color: C.muted, fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
            Enter your credentials to access your dashboard.
          </p>

          {/* Social buttons */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <SocialButton icon={<GoogleIcon />} label="Google" />
            <SocialButton icon={<AppleIcon />} label="Apple" />
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: C.border }} />
            <span style={{ color: C.muted, fontSize: 13 }}>Or</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Field label="Email">
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="eg. you@business.com"
                required
                style={inputStyle(C)}
                onFocus={e => (e.target.style.borderColor = C.accent)}
                onBlur={e => (e.target.style.borderColor = C.border)}
              />
            </Field>

            <Field label="Password" style={{ marginTop: 18 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ ...inputStyle(C), paddingRight: 44 }}
                  onFocus={e => (e.target.style.borderColor = C.accent)}
                  onBlur={e => (e.target.style.borderColor = C.border)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: C.muted,
                    display: 'flex', alignItems: 'center', padding: 4,
                  }}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <p style={{ color: C.muted, fontSize: 12, marginTop: 6 }}>Must be at least 8 characters.</p>
            </Field>

            {error && (
              <div style={{
                background: 'rgba(248,113,113,0.08)',
                border: '1px solid rgba(248,113,113,0.25)',
                borderRadius: 10, padding: '12px 14px',
                color: C.error, fontSize: 13, lineHeight: 1.5,
                marginTop: 18,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', marginTop: 26,
                background: loading ? C.surface2 : C.text,
                color: loading ? C.muted : C.bg,
                border: 'none', borderRadius: 12,
                padding: '14px', fontSize: 15, fontWeight: 600,
                cursor: loading ? 'default' : 'pointer',
                letterSpacing: '-0.01em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.15s',
              }}
            >
              {loading ? <><Spinner /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <p style={{ color: C.muted, fontSize: 13, textAlign: 'center', marginTop: 24 }}>
            Don't have an account?{' '}
            <span style={{ color: C.text, fontWeight: 600, cursor: 'pointer' }}>Contact us</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Field({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={style}>
      <label style={{ display: 'block', color: '#A1A1AA', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SocialButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'transparent',
        border: '1px solid #27272A',
        borderRadius: 10, padding: '11px 16px',
        color: '#FAFAFA', fontSize: 14, fontWeight: 500,
        cursor: 'pointer',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#141417')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {icon}
      {label}
    </button>
  )
}

function inputStyle(C: Record<string, string>): React.CSSProperties {
  return {
    width: '100%',
    background: '#141417',
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: '12px 14px',
    color: C.text,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.15s',
  }
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  )
}

function Spinner() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2"/>
      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}
