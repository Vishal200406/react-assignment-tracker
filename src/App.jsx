import AssignmentForm from './components/AssignmentForm'
import './App.css'

function App() {
  function handleAddAssignment(newAssignment) {
    console.log('Assignment submitted:', newAssignment)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Student productivity</p>

          <h1>Assignment Tracker</h1>

          <p className="header-description">
            Organize coursework, prioritize deadlines, and monitor your progress.
          </p>
        </div>

        <div className="project-badge">React Group Project</div>
      </header>

      <main className="app-main">
        <section
          className="stats-grid"
          aria-label="Assignment statistics"
        >
          <article className="stat-card">
            <span>Total assignments</span>
            <strong>0</strong>
          </article>

          <article className="stat-card">
            <span>Pending</span>
            <strong>0</strong>
          </article>

          <article className="stat-card">
            <span>Completed</span>
            <strong>0</strong>
          </article>
        </section>

        <section className="workspace-grid">
          <aside className="panel form-panel">
            <div className="panel-heading">
              <p className="section-label">New task</p>

              <h2>Add an assignment</h2>

              <p>
                Enter the assignment details and select its priority level.
              </p>
            </div>

            <AssignmentForm onAddAssignment={handleAddAssignment} />
          </aside>

          <section className="panel assignments-panel">
            <div className="panel-heading">
              <p className="section-label">Coursework</p>

              <h2>Your assignments</h2>

              <p>
                View and manage all your upcoming coursework.
              </p>
            </div>

            <div className="toolbar-placeholder">
              Filters and search controls will appear here.
            </div>

            <div className="empty-state">
              <div
                className="empty-state-icon"
                aria-hidden="true"
              >
                ✓
              </div>

              <h3>No assignments yet</h3>

              <p>
                Add your first assignment to begin tracking your coursework.
              </p>
            </div>
          </section>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React by Team React</p>
      </footer>
    </div>
  )
}

export default App