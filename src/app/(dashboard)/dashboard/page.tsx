import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import { SectionCards } from "@/components/dashboard/section-cards"
import { SiteHeader } from "@/components/dashboard/site-header"
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import data from "./data.json"


export default async function DashboardSubPage() {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/sign-in')
  }
  return (
    
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-6">
        <SiteHeader />
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>

  )
}
