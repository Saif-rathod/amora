import { Loading } from "@/components/ui/loading"

export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading variant="rose" size="lg" />
    </div>
  )
}
