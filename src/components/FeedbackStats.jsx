function FeedbackStats({ feedback }) {
  const feedbackLength = feedback.length
  const average =
    feedback.reduce((sum, item) => sum + item.rating, 0) / feedbackLength

  return (
    <div className='feedback-stats'>
      <h4>The number of feedback: {feedback.length}</h4>
      <h4>The average rating: {average}</h4>
    </div>
  )
}

export default FeedbackStats
