import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const dark = mode === 'dark'
  const C = {
    bg: dark ? '#111111' : '#FFFFFF',
    border: dark ? '#2A2A2A' : '#E4E4E7',
    text: dark ? '#F5F5F5' : '#09090B',
    muted: dark ? '#737373' : '#71717A',
    surface: dark ? '#1A1A1A' : '#F4F4F5',
    surface2: dark ? '#272727' : '#E4E4E7',
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

        {/* Avatar + dropdown */}
        <div ref={dropRef} style={{ position: 'relative' }}>
          <div
            onClick={() => setDropOpen(o => !o)}
            style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: `linear-gradient(135deg, rgba(124,110,245,0.55), rgba(124,110,245,0.85))`,
              border: `1px solid ${dropOpen ? 'rgba(124,110,245,0.8)' : 'rgba(124,110,245,0.4)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              userSelect: 'none',
            }}
            title={user ? `${user.firstName} ${user.lastName}` : 'Account'}
          >
            {initials}
          </div>

          {dropOpen && (
            <div style={{
              position: 'absolute', top: 44, right: 0, zIndex: 100,
              background: dark ? '#1A1A1A' : '#FFFFFF',
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              boxShadow: dark
                ? '0 8px 24px rgba(0,0,0,0.5)'
                : '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: 180,
              overflow: 'hidden',
              padding: '6px 0',
            }}>
              {/* User info header */}
              <div style={{ padding: '10px 16px 8px', borderBottom: `1px solid ${C.border}` }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: C.text }}>
                  {user ? `${user.firstName} ${user.lastName}` : 'Account'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: C.muted }}>
                  {user?.email ?? ''}
                </p>
              </div>

              <DropItem
                label="Profile"
                icon={<ProfileIcon />}
                color={C.text}
                hoverBg={dark ? '#252525' : '#F4F4F5'}
                onClick={() => { setDropOpen(false); navigate('/profile') }}
              />
              <DropItem
                label="Settings"
                icon={<SettingsIcon />}
                color={C.text}
                hoverBg={dark ? '#252525' : '#F4F4F5'}
                onClick={() => { setDropOpen(false); navigate('/settings') }}
              />

              {/* Divider */}
              <div style={{ height: 1, background: C.border, margin: '6px 0' }} />

              <DropItem
                label="Sign out"
                icon={<SignOutIcon />}
                color="#EF4444"
                hoverBg={dark ? '#2A1A1A' : '#FEF2F2'}
                onClick={async () => { setDropOpen(false); await logout(); navigate('/login') }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

/* ── Dropdown menu item ────────────────────────────────────── */
function DropItem({ label, icon, color, hoverBg, onClick }: {
  label: string
  icon: React.ReactNode
  color: string
  hoverBg: string
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '9px 16px',
        background: hovered ? hoverBg : 'transparent',
        border: 'none', cursor: 'pointer',
        color, fontSize: 13, fontWeight: 500,
        transition: 'background 0.1s',
        textAlign: 'left',
      }}
    >
      <span style={{ opacity: 0.8, display: 'flex' }}>{icon}</span>
      {label}
    </button>
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

function ProfileIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SignOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
