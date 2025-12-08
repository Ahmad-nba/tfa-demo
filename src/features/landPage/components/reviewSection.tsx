import React from "react";
import ReviewCard from "../components/reviewCard";
import { reviewsData } from "../lib/reviews";
import { Review } from "../type-safety/reviewCardProps";

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-background px-6">
      <h2 className="text-2xl text-text-primary md:text-3xl font-bold text-center mb-10">
        What Our Members Say
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviewsData.map((review: Review, index: number) => (
          <ReviewCard key={index} {...review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
