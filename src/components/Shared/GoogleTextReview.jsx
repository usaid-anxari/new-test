import { useState } from "react"
import { StarIcon, PencilIcon } from "@heroicons/react/24/solid"
import GoogleReviewForm from "./GoogleReviewForm"
import GoogleReviewCard from "./GoogleReviewCard"

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    text: "Excellent service! The team was professional and delivered exactly what we needed. Highly recommend!",
    avatar: null,
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 4,
    date: "1 week ago",
    text: "Great experience overall. Quick response time and quality work. Would definitely use again.",
    avatar: null,
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    rating: 5,
    date: "2 weeks ago",
    text: "Outstanding! Exceeded my expectations in every way. The attention to detail was impressive.",
    avatar: null,
  },
]

export default function GoogleReviews() {
  const [reviews, setReviews] = useState(mockReviews)
  const [showForm, setShowForm] = useState(false)

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const addReview = (newReview) => {
    const review = {
      id: Date.now(),
      ...newReview,
      date: "Just now",
      avatar: null,
    }
    setReviews([review, ...reviews])
    setShowForm(false)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Customer Reviews</h1>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-6 h-6 ${star <= Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-lg font-medium text-foreground">{averageRating.toFixed(1)} out of 5</span>
          <span className="text-muted-foreground">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <PencilIcon className="w-5 h-5" />
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="max-w-2xl mx-auto">
          <GoogleReviewForm onSubmit={addReview} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">All Reviews</h2>
        <div className="grid gap-6">
          {reviews.map((review) => (
            <GoogleReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
