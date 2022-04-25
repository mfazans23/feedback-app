import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    getFeedback()
  }, [])

  // Fetch feedback from local storage
  const getFeedback = () => {
    const feedbackLS = localStorage.getItem('feedback')

    if (feedbackLS !== null) {
      setFeedback(JSON.parse(feedbackLS))
    } else {
      setFeedback([])
    }
    setIsLoading(false)
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = feedback.length + 1
    setFeedback([newFeedback, ...feedback])
    localStorage.setItem('feedback', JSON.stringify([newFeedback, ...feedback]))
  }

  const deleteFeedback = (id) => {
    setFeedback(feedback.filter((item) => item.id !== id))
    localStorage.setItem(
      'feedback',
      JSON.stringify(feedback.filter((item) => item.id !== id))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )

    localStorage.setItem('feedback', feedback)

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
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext

// Fetch feedback data
// const fetchFeedback = async () => {
//   const response = await fetch(`/feedback?_sort=id&_order=desc`)
//   const data = await response.json()
//   setFeedback(data)
//   setIsLoading(false)
// setFeedback(feedbackData)
// setIsLoading(false)
// }

// Add New Feedback
// const addFeedback = async (newFeedback) => {
//   const response = await fetch(`/feedback`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newFeedback),
//   })

//   const data = await response.json()
//   setFeedback([data, ...feedback])
// }

// Delete Feedback
// const deleteFeedback = async (id) => {
//   await fetch(`/feedback/${id}`, {
//     method: 'DELETE',
//   })
//   setFeedback(feedback.filter((item) => item.id !== id))
// }

// Update feedback
// const updateFeedback = async (id, updItem) => {
//   const response = await fetch(`/feedback/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updItem),
//   })
//   const data = await response.json()
//   setFeedback(
//     feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
//   )

//   setFeedbackEdit({
//     item: {},
//     edit: false,
//   })
// }
