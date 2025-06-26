import { AlertTriangle, Package, Boxes, Grid } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Critical Alerts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-200" variant="outline">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Urgent
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Items require immediate attention
          </div>
          <div className="text-muted-foreground">
            3 products below critical threshold
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Low Stock Items</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            8
          </CardTitle>
          <CardAction>
            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200" variant="outline">
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Warning
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Items approaching minimum levels
          </div>
          <div className="text-muted-foreground">
            Consider restocking these products soon
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Products</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            42
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Package className="h-3.5 w-3.5 mr-1" />
              Active
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            All inventory items
          </div>
          <div className="text-muted-foreground">
            42 products currently in inventory
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Categories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            6
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Grid className="h-3.5 w-3.5 mr-1" />
              Groups
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Product categorization
          </div>
          <div className="text-muted-foreground">
            Electronics, Furniture, Clothing, etc.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
