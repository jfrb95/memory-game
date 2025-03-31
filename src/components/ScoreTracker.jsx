export default function ScoreTracker({ scoreHandler }) {
  return (
    <div className='scores'>
      <p>Score: {scoreHandler.scores.current}</p>
      <p>Best Score: {scoreHandler.scores.high}</p>
    </div>
  )
}