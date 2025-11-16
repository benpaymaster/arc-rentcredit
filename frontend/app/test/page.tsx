'use client'

export default function TestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'purple', color: 'white', fontSize: '24px' }}>
      <h1>React Test Page</h1>
      <p>If you see this styled, React is working!</p>
      <button onClick={() => alert('JavaScript works!')}>
        Click me to test JS
      </button>
    </div>
  )
}