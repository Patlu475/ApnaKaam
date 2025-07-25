import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { SectionCards } from "@/components/dashboard/section-cards"
import { SiteHeader } from "@/components/dashboard/site-header"

export const metadata = {
  title: 'dashboard',
};

export default async function DashboardSubPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="@container/main flex flex-1 flex-col pt-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  )
}
