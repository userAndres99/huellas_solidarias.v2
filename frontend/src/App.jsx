import { useEffect, useState } from 'react'
import apiClient from './api/client'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')

  const loadHealth = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await apiClient.get('/api/health')
      setHealth(response.data)
    } catch (err) {
      setHealth(null)
      setError(
        err?.response?.data?.message ||
          'No se pudo conectar con el backend. Revisa que Laravel este corriendo en el puerto 8000.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHealth()
  }, [])

  const statusLabel = health?.db === 'connected' ? 'Conectado' : 'Sin conexion'
  const statusClass = health?.db === 'connected' ? 'ok' : 'error'

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Huellas Solidarias</p>
        <h1>Estado de API Laravel</h1>
        <p className="subtitle">
          Verificacion inicial de conexion entre frontend React y backend Laravel.
        </p>

        {loading && <p className="muted">Consultando /api/health...</p>}

        {!loading && error && (
          <div className="alert error">
            <p>{error}</p>
          </div>
        )}

        {!loading && health && (
          <div className="result">
            <p>
              API: <strong>{health.status}</strong>
            </p>
            <p>
              App: <strong>{health.app}</strong>
            </p>
            <p>
              DB:{' '}
              <strong className={statusClass}>
                {statusLabel} ({health.db})
              </strong>
            </p>
            <p>
              Timestamp: <code>{health.timestamp}</code>
            </p>
          </div>
        )}

        <button type="button" onClick={loadHealth} className="btn">
          Probar de nuevo
        </button>
      </section>
    </main>
  )
}

export default App
