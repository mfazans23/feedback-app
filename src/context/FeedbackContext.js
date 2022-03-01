import { createContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // Fetch feedback data
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:5000/feedback?_sort=id&_order=desc`
    )
    const data = await response.json()
    setFeedback(data)
  }

  // Add New Feedback
  const addFeedback = async (newFeedback) => {
    try {
      const response = await fetch(`http://localhost:5000/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      })
      const data = await response.json()
      setFeedback([data, ...feedback])
    } catch (error) {
      console.log(error)
    }
    // setFeedback([data, ...feedback])
  }
  // Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure to delete this feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }
  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }
  // Update feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
