import { useState } from "react"
import { StarIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarOutlineIcon, XMarkIcon } from "@heroicons/react/24/outline"

export default function GoogleReviewForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating > 0 && author.trim() && text.trim()) {
      onSubmit({
        rating,
        author: author.trim(),
        text: text.trim(),
      })
      // Reset form
      setRating(0)
      setHoverRating(0)
      setAuthor("")
      setText("")
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Write a Review</h3>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Rating *</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hoverRating || rating)
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  {isFilled ? (
                    <StarIcon className="w-8 h-8 text-yellow-400" />
                  ) : (
                    <StarOutlineIcon className="w-8 h-8 text-gray-300" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-foreground mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-foreground mb-2">
            Your Review *
          </label>
          <textarea
            id="review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Share your experience..."
            required
          />
          <div className="text-right text-sm text-muted-foreground mt-1">{text.length}/500</div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <button
            type="submit"
            disabled={!rating || !author.trim() || !text.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Submit Review
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}