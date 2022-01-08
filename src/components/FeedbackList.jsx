import FeedbackItem from './FeedbackItem'

function FeedbackList({ feedback }) {
  console.log(feedback)
  return (
    <div>
      {feedback.map((comment, index) => (
        <FeedbackItem key={index} rating={comment.rating} text={comment.text} />
      ))}
    </div>
  )
}

export default FeedbackList
