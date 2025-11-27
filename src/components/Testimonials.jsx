'use client';
import { useState } from 'react';

const testimonialData = [
  {
    id: 1,
    text: "This is an amazing service! Highly recommended.",
    author: "John Doe",
    role: "CEO, Company Inc"
  },
  {
    id: 2,
    text: "Outstanding quality and professional service.",
    author: "Jane Smith",
    role: "Marketing Director"
  },
  {
    id: 3,
    text: "Quality and durability are more than excellent. Such quality is rare these days specially when compared to the market price.",
    author: "Khaled Naga",
    role: "Marketing Director"
  },
  // Add more testimonials...
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="m-3 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-white-800">
        Testimonials
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonialData.map((testimonial, index) => (
          <div 
            key={testimonial.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-gray-600 italic mb-4">
              {testimonial.text}
            </p>
            <div className="border-t pt-4">
              <p className="font-semibold text-gray-800">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}