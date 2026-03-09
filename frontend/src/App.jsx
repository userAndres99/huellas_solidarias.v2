import { useState } from 'react'
import { login, logout, me, register } from './api/auth'
import './App.css'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async () => {
    try {
      setLoading(true)
      setMessage('')
      await register(form)
      const { data } = await me()
      setUser(data)
      setMessage('Registro exitoso y sesión iniciada.')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error al registrar.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      setMessage('')
      await login({ email: form.email, password: form.password })
      const { data } = await me()
      setUser(data)
      setMessage('Login exitoso.')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error al iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  const handleMe = async () => {
    try {
      setLoading(true)
      setMessage('')
      const { data } = await me()
      setUser(data)
      setMessage('Usuario cargado.')
    } catch (error) {
      setUser(null)
      setMessage(error?.response?.data?.message || 'No autenticado.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setLoading(true)
      setMessage('')
      await logout()
      setUser(null)
      setMessage('Sesión cerrada.')
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error al cerrar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: '2rem auto', padding: '1rem' }}>
      <h1>Auth Breeze API</h1>

      <input name="name" placeholder="Nombre" value={form.name} onChange={onChange} style={{ width: '100%', marginBottom: 8 }} />
      <input name="email" placeholder="Email" value={form.email} onChange={onChange} style={{ width: '100%', marginBottom: 8 }} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} style={{ width: '100%', marginBottom: 8 }} />
      <input
        name="password_confirmation"
        type="password"
        placeholder="Confirmar password"
        value={form.password_confirmation}
        onChange={onChange}
        style={{ width: '100%', marginBottom: 12 }}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button onClick={handleRegister} disabled={loading}>Register</button>
        <button onClick={handleLogin} disabled={loading}>Login</button>
        <button onClick={handleMe} disabled={loading}>Me</button>
        <button onClick={handleLogout} disabled={loading}>Logout</button>
      </div>

      {message && <p><strong>Estado:</strong> {message}</p>}
      <pre style={{ background: '#f4f4f4', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(user, null, 2)}
      </pre>
    </main>
  )
}

export default App