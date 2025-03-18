"use client"

import { useParams } from 'next/navigation'

export default function OccasionPage() {
  const params = useParams()
  const occasionType = params.type as string

  const formatOccasionType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {formatOccasionType(occasionType)} Adventures
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your occasion specific content here */}
        <p className="text-gray-600">
          Explore our collection of {occasionType} adventures and experiences.
        </p>
      </div>
    </div>
  )
}
