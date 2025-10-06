import React, { useState } from "react";
import "./StarRating.css"; // CSS separado para estilos bonitos
import { Star } from "lucide-react";

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[1,2,3,4,5].map((star) => (
        <Star
          key={star}
          className={`star ${star <= (hover || rating) ? "filled" : ""}`}
          size={30}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );
}
