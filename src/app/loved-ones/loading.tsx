import { Loading } from "@/components/ui/loading"
import { Heart } from "lucide-react"

export default function LovedOnesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50 flex flex-col items-center justify-center">
      <div className="animate-pulse mb-8">
        <Heart className="h-16 w-16 text-rose-400" />
      </div>
      <Loading variant="rose" size="lg" />
      <p className="mt-4 text-rose-600 animate-pulse font-medium">Loading your loved ones...</p>
    </div>
  )
}
