import { SiteHeader } from "@/components/dashboard/site-header"

export default function DashboardSubPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SiteHeader />
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Dashboard Page</h1>
        <p className="mt-4">This is a subpage within the dashboard route. The sidebar should still be visible.</p>
      </div>
    </div>
  )
} 