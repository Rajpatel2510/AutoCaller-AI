import { useState } from 'react'
import './AgentSettingsForm.css'

const languageOptions = ['English', 'Spanish', 'French', 'German', 'Hindi']
const platformOptions = ['Open AI Realtime', 'Custom API', 'Web App', 'Mobile SDK']
const aiModelOptions = ['GPT-4o Mini Realtime Preview', 'GPT-4o', 'GPT-4', 'GPT-3.5']

export default function AgentSettingsForm() {
  const [values, setValues] = useState({
    welcomeMessage: 'Hello! I am here to help with your outbound campaigns.',
    shortDescription: 'Personalized agent settings for high-quality customer outreach.',
    detailedDescription:
      'Use this agent to configure welcome text, voice and AI settings. Adjust language, platform, model, and response temperature for a tailored experience.',
    language: 'English',
    platform: 'Open AI Realtime',
    aiModel: 'GPT-4o Mini Realtime Preview',
    temperature: 0.6,
    countryCode: '+1',
    phoneNumber: '123 456 7890',
  })

  const updateField = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  return (
    <section className="agent-settings-card">
      <div className="agent-settings-grid">
        {/* <div className="settings-panel">
          <div className="panel-heading">
            <span className="panel-label">Agent preview</span>
            <h2>Brand perception and interaction</h2>
            <p>
              A professional agent configuration makes each call feel polished and consistent.
            </p>
          </div>

          <div className="preview-box">
            <div className="agent-avatar">AG</div>
            <div>
              <p className="preview-title">Outbound Agent</p>
              <p className="preview-subtitle">Mia Instant on Open AI Realtime</p>
            </div>
          </div>

          <div className="theme-section">
            <p className="section-title">Theme</p>
            <div className="theme-swatches">
              <button className="swatch active" aria-label="Violet theme" />
              <button className="swatch" aria-label="Teal theme" />
              <button className="swatch" aria-label="Blue theme" />
              <button className="swatch" aria-label="Orange theme" />
              <button className="swatch" aria-label="Gray theme" />
            </div>
          </div>
        </div> */}

        <div className="form-panel">
          <div className="form-group">
            <label htmlFor="welcomeMessage">Welcome message</label>
            <textarea
              id="welcomeMessage"
              value={values.welcomeMessage}
              onChange={(event) => updateField('welcomeMessage', event.target.value)}
              rows="3"
              placeholder="Enter the message users see first"
            />
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Short description</label>
            <input
              id="shortDescription"
              type="text"
              value={values.shortDescription}
              onChange={(event) => updateField('shortDescription', event.target.value)}
              placeholder="Summarize the agent in one sentence"
            />
          </div>

          <div className="form-group phone-field-group">
            <label htmlFor="phoneNumber">Mobile number</label>
            <div className="phone-input-row">
              <select
                id="countryCode"
                value={values.countryCode}
                onChange={(event) => updateField('countryCode', event.target.value)}
              >
                <option value="+1">+1 United States</option>
                <option value="+44">+44 United Kingdom</option>
                <option value="+91">+91 India</option>
                <option value="+61">+61 Australia</option>
                <option value="+49">+49 Germany</option>
              </select>
              <input
                id="phoneNumber"
                type="tel"
                value={values.phoneNumber}
                onChange={(event) => updateField('phoneNumber', event.target.value)}
                placeholder="123 456 7890"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="detailedDescription">Detailed description</label>
            <textarea
              id="detailedDescription"
              value={values.detailedDescription}
              onChange={(event) => updateField('detailedDescription', event.target.value)}
              rows="5"
              placeholder="Describe the agent capabilities and style"
            />
          </div>

          <div className="two-column-grid">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={values.language}
                onChange={(event) => updateField('language', event.target.value)}
              >
                {languageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select
                id="platform"
                value={values.platform}
                onChange={(event) => updateField('platform', event.target.value)}
              >
                {platformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="two-column-grid">
            <div className="form-group">
              <label htmlFor="aiModel">AI model</label>
              <select
                id="aiModel"
                value={values.aiModel}
                onChange={(event) => updateField('aiModel', event.target.value)}
              >
                {aiModelOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="temperature">Temperature</label>
              <input
                id="temperature"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={values.temperature}
                onChange={(event) => updateField('temperature', Number(event.target.value))}
              />
              <div className="range-value">{values.temperature.toFixed(2)}</div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button">
              Back
            </button>
            <button type="button" className="primary-button">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
