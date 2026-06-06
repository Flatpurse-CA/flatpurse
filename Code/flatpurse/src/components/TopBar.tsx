import React from 'react'
import { useAuth } from '../context/AuthContext'

interface TopBarProps {
  mode: 'dark' | 'light'
  onToggleMode: () => void
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function todayLabel() {
  return new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function TopBar({ mode, onToggleMode }: TopBarProps) {
  const { user } = useAuth()

  const dark = mode === 'dark'
  const C = {
    bg: dark ? '#1A1927' : '#FFFFFF',
    border: dark ? '#2C2A3F' : '#E4E4E7',
    text: dark ? '#E8E6F4' : '#09090B',
    muted: dark ? '#8C8AA8' : '#71717A',
    surface: dark ? '#211F30' : '#F4F4F5',
    surface2: dark ? '#2C2A3F' : '#E4E4E7',
    accent: '#7C6EF5',
    badge: '#EF4444',
  }

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '?'
    : '?'

  return (
    <header style={{
      height: 64,
      background: C.bg,
      borderBottom: `1px solid ${C.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>

      {/* ── Left: welcome ──────────────────────────────────── */}
      <div>
        <h1 style={{ color: C.text, fontSize: 17, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2, margin: 0 }}>
          {greeting()}{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </h1>
        <p style={{ color: C.muted, fontSize: 12, margin: '2px 0 0', letterSpacing: '-0.01em' }}>
          {todayLabel()}
        </p>
      </div>

      {/* ── Right: actions ─────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

        {/* Messages */}
        <IconBtn color={C.muted} bg={C.surface} border={C.border} title="Messages">
          <MessagesIcon />
        </IconBtn>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <IconBtn color={C.muted} bg={C.surface} border={C.border} title="Notifications">
            <BellIcon />
          </IconBtn>
          <span style={{
            position: 'absolute', top: 3, right: 3,
            width: 7, height: 7, borderRadius: '50%',
            background: C.badge,
            border: `2px solid ${C.bg}`,
          }} />
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: C.border, margin: '0 4px' }} />

        {/* Light / dark toggle */}
        <button
          onClick={onToggleMode}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: 36, height: 36, borderRadius: 10,
            background: C.surface, border: `1px solid ${C.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: C.muted, transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.surface2; e.currentTarget.style.color = C.text }}
          onMouseLeave={e => { e.currentTarget.style.background = C.surface; e.currentTarget.style.color = C.muted }}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: C.border, margin: '0 4px' }} />

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: `linear-gradient(135deg, rgba(124,110,245,0.55), rgba(124,110,245,0.85))`,
          border: `1px solid rgba(124,110,245,0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
          userSelect: 'none',
        }}
        title={user ? `${user.firstName} ${user.lastName}` : 'Account'}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}

/* ── Reusable icon button ──────────────────────────────────── */
function IconBtn({ children, color, bg, border, title }: {
  children: React.ReactNode
  color: string
  bg: string
  border: string
  title?: string
}) {
  return (
    <button
      title={title}
      style={{
        width: 36, height: 36, borderRadius: 10,
        background: bg, border: `1px solid ${border}`,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, transition: 'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)' }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
    >
      {children}
    </button>
  )
}

/* ── Icons ─────────────────────────────────────────────────── */
function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MessagesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
