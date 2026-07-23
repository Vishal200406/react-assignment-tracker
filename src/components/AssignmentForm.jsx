import { useState } from 'react'

const initialFormData = {
  title: '',
  course: '',
  dueDate: '',
  priority: 'Medium',
}

function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function AssignmentForm({ onAddAssignment }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const minimumDate = getTodayDate()

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))

    setSuccessMessage('')
  }

  function validateForm() {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Assignment name is required.'
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course name is required.'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.'
    } else if (formData.dueDate < minimumDate) {
      newErrors.dueDate = 'Due date cannot be in the past.'
    }

    if (!['Low', 'Medium', 'High'].includes(formData.priority)) {
      newErrors.priority = 'Select a valid priority.'
    }

    return newErrors
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      return
    }

    const newAssignment = {
      id:
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: formData.title.trim(),
      course: formData.course.trim(),
      dueDate: formData.dueDate,
      priority: formData.priority,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    if (typeof onAddAssignment === 'function') {
      onAddAssignment(newAssignment)
    }

    setFormData(initialFormData)
    setErrors({})
    setSuccessMessage('Assignment added successfully.')
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="assignment-title">Assignment name</label>

        <input
          id="assignment-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Example: React group presentation"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />

        {errors.title && (
          <p id="title-error" className="field-error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assignment-course">Course</label>

        <input
          id="assignment-course"
          name="course"
          type="text"
          value={formData.course}
          onChange={handleChange}
          placeholder="Example: Web Development"
          aria-invalid={Boolean(errors.course)}
          aria-describedby={errors.course ? 'course-error' : undefined}
        />

        {errors.course && (
          <p id="course-error" className="field-error">
            {errors.course}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assignment-due-date">Due date</label>

        <input
          id="assignment-due-date"
          name="dueDate"
          type="date"
          min={minimumDate}
          value={formData.dueDate}
          onChange={handleChange}
          aria-invalid={Boolean(errors.dueDate)}
          aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
        />

        {errors.dueDate && (
          <p id="due-date-error" className="field-error">
            {errors.dueDate}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assignment-priority">Priority</label>

        <select
          id="assignment-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          aria-invalid={Boolean(errors.priority)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {errors.priority && (
          <p className="field-error">{errors.priority}</p>
        )}
      </div>

      <button className="submit-button" type="submit">
        Add assignment
      </button>

      {successMessage && (
        <p className="form-success" role="status">
          {successMessage}
        </p>
      )}
    </form>
  )
}

export default AssignmentForm