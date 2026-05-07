import './App.css'
import AgentSettingsForm from './components/agent-settings/AgentSettingsForm'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <span className="eyebrow">Agent configuration</span>
          <h1>Professional agent setup</h1>
          <p className="intro">
            Configure welcome message, descriptions, language, platform, AI model, and temperature in a polished interface.
          </p>
        </div>
      </header>

      <main className="app-main">
        <AgentSettingsForm />
      </main>
    </div>
  )
}

export default App
