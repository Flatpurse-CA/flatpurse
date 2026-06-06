import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import BottomNav from './components/BottomNav'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Clients from './pages/Clients'
import Team from './pages/Team'
import AutoPilot from './pages/AutoPilot'
import Operations from './pages/Operations'
import Splash from './pages/Splash'
import { useIsMobile } from './lib/auth-ui'

export type Tab = 'home' | 'bookings' | 'clients' | 'team' | 'autopilot' | 'operations'

function AppShell() {
  const [tab, setTab] = useState<Tab>('home')
  const [mode, setMode] = useState<'dark' | 'light'>('dark')
  const { user } = useAuth()
  const isMobile = useIsMobile()

  const dark = mode === 'dark'
  const pageBg = dark ? '#0A0A0A' : '#F0F0F5'

  const pages: Record<Tab, React.ReactElement> = {
    home: <Home />,
    bookings: <Bookings />,
    clients: <Clients />,
    team: <Team />,
    autopilot: <AutoPilot />,
    operations: <Operations />,
  }

  /* ── Mobile ─────────────────────────────────────────────── */
  if (isMobile) {
    const initials = user
      ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
      : '?'
    return (
      <div className="flex flex-col h-dvh bg-bg font-sans max-w-[480px] mx-auto relative overflow-hidden">
        <header
          className="flex items-center justify-between px-5 shrink-0 z-40"
          style={{ paddingTop: 'calc(var(--safe-area-top) + 14px)', paddingBottom: 14 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">f</span>
            </div>
            <span className="text-text font-bold text-base tracking-tight">flatpurse</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-surface2 border border-border flex items-center justify-center font-bold text-xs text-accent-text cursor-pointer">
            {initials}
          </button>
        </header>
        <main
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ paddingBottom: 'calc(var(--safe-area-bottom, 0px) + 72px)', WebkitOverflowScrolling: 'touch' }}
        >
          {pages[tab]}
        </main>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    )
  }

  /* ── Desktop ─────────────────────────────────────────────── */
  return (
    <div style={{ display: 'flex', height: '100vh', background: pageBg, fontFamily: "'DM Sans', system-ui, sans-serif", overflow: 'hidden', colorScheme: mode }}>
      <Sidebar active={tab} onChange={setTab} mode={mode} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar mode={mode} onToggleMode={() => setMode(m => m === 'dark' ? 'light' : 'dark')} />
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', background: pageBg }}>
          {pages[tab]}
        </main>
      </div>
    </div>
  )
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-bg">
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-sm font-bold">f</span>
          </div>
          <p className="text-muted text-sm">Loading…</p>
        </div>
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  // Blur any focused input when the app goes to background so iOS
  // doesn't restore that focus (and pop the keyboard) on next open.
  useEffect(() => {
    const onHide = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
    document.addEventListener('visibilitychange', onHide)
    return () => document.removeEventListener('visibilitychange', onHide)
  }, [])

  const [splashDone, setSplashDone] = useState(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return true
    return sessionStorage.getItem('fp-splash') === '1'
  })

  function handleSplashDone() {
    sessionStorage.setItem('fp-splash', '1')
    setSplashDone(true)
  }

  return (
    <>
      {!splashDone && <Splash onDone={handleSplashDone} />}
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<RequireAuth><AppShell /></RequireAuth>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}
