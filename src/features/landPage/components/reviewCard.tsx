import { Review } from "../type-safety/reviewCardProps";

const ReviewCard = ({ name, role, comment, rating, icon: Star }: Review) => {
  return (
    <div className="p-6 bg-surface-2 backdrop-blur-md border border-border rounded-xl shadow-xl">
      <div className="flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="text-yellow-400 text-lg" />
        ))}
      </div>

      <p className="text-sm text-white/90 mb-4">{comment}</p>

      <div className="mt-auto">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-xs text-white/70">{role}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
