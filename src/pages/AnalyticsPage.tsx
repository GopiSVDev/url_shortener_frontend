import { useUserUrlStats } from "@/api/analyticsApi";
import DeviceStats from "@/components/Analytics/DeviceStats";
import { ChartAreaInteractive } from "@/components/Dashboard/ChartAreaInteractive";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader } from "lucide-react";

const AnalyticsPage = () => {
  const { data: stats } = useUserUrlStats();

  const clicksByCountry = Object.entries(stats?.clicksByCountry || {}).map(
    ([location, clicks]) => ({
      location,
      clicks,
    })
  );

  const clicksByDeviceType = Object.entries(
    stats?.clicksByDeviceType || {}
  ).map(([device, clicks]) => ({
    device,
    clicks,
  }));

  const clicksByCity = Object.entries(stats?.clicksByCity || {}).map(
    ([location, clicks]) => ({
      location,
      clicks,
    })
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardDescription>Total Clicks</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {stats ? (
                    stats.totalClicks
                  ) : (
                    <Loader className="animate-spin h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="text-muted-foreground">
                  Total number of clicks
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardDescription>Total Links</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {stats ? (
                    stats.totalLinks
                  ) : (
                    <Loader className="animate-spin h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="text-muted-foreground">
                  Total number of links created
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardDescription>Top Country</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {stats ? (
                    clicksByCountry.length > 0 ? (
                      clicksByCountry[0].location
                    ) : (
                      <span>--</span>
                    )
                  ) : (
                    <Loader className="animate-spin h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="text-muted-foreground">
                  Top country by clicks
                </div>
              </CardFooter>
            </Card>
            <Card className="@container/card">
              <CardHeader className="relative">
                <CardDescription>Top Device</CardDescription>
                <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                  {stats ? (
                    clicksByDeviceType.length > 0 ? (
                      clicksByDeviceType[0].device.charAt(0).toUpperCase() +
                      clicksByDeviceType[0].device.slice(1)
                    ) : (
                      <span>--</span>
                    )
                  ) : (
                    <Loader className="animate-spin h-5 w-5 text-gray-500" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="text-muted-foreground">
                  Top device by clicks
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="px-4 lg:px-6 space-y-5">
            <Separator />
            <ChartAreaInteractive />
          </div>
          {/*  */}
          <div className="px-6 space-y-5">
            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Top Visitors By Country</CardTitle>
                <CardDescription>Visitor countries</CardDescription>
              </CardHeader>
              <CardContent>
                {clicksByCountry.length === 0 ? (
                  <p className="text-muted-foreground">No location data.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Clicks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clicksByCountry.map(({ location, clicks }) => (
                        <TableRow key={location}>
                          <TableCell>{location}</TableCell>
                          <TableCell>{clicks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Top Visitors By Cities</CardTitle>
                <CardDescription>Visitor cities</CardDescription>
              </CardHeader>
              <CardContent>
                {clicksByCity.length === 0 ? (
                  <p className="text-muted-foreground">No location data.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Clicks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clicksByCity.map(({ location, clicks }) => (
                        <TableRow key={location}>
                          <TableCell>{location}</TableCell>
                          <TableCell>{clicks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Separator />

            <DeviceStats
              clicksByDeviceType={
                stats?.clicksByDeviceType
                  ? Object.entries(stats.clicksByDeviceType).map(
                      ([device, clicks]) => ({
                        device,
                        clicks,
                      })
                    )
                  : []
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
