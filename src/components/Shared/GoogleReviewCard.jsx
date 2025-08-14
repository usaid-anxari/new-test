import { StarIcon, UserCircleIcon } from "@heroicons/react/24/solid"

export default function GoogleReviewCard({ review }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {review.avatar ? (
            <img
              src={review.avatar || "/placeholder.svg"}
              alt={review.author}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="w-12 h-12 text-muted-foreground" />
          )}
        </div>

        {/* Review Content */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{review.author}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{review.date}</span>
              </div>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-foreground leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  )
}