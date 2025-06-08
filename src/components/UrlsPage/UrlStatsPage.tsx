// import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import DeviceStats from "../Analytics/DeviceStats";
import LineChartStats from "../Analytics/LineChartStats";
import { useUrlStats } from "@/api/analyticsApi";
import { Loader } from "lucide-react";

type RouteState = {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
};

type UrlStats = {
  originalUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  totalClicks: number;
  clicksByDate: { date: string; clicks: number }[];
  clicksByDeviceType: { device: string; clicks: number }[];
  clicksByCountry: { location: string; clicks: number }[];
  clicksByCity: { location: string; clicks: number }[];
};

export default function UrlStatsPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const location = useLocation();
  const state = location.state as RouteState;

  const { data: stats, isLoading } = useUrlStats(shortCode!);

  if (isLoading || !stats || !state)
    return (
      <div className="flex justify-center items-center">
        <Loader className="mt-10 animate-spin text-gray-500" size={50} />
      </div>
    );

  const fullStats: UrlStats = {
    originalUrl: state.originalUrl,
    shortCode: state.shortCode,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    totalClicks: stats.totalClicks,
    clicksByDate: Object.entries(stats.clicksByDate).map(([date, clicks]) => ({
      date,
      clicks,
    })),
    clicksByDeviceType: Object.entries(stats.clicksByDeviceType).map(
      ([device, clicks]) => ({
        device,
        clicks,
      })
    ),
    clicksByCountry: Object.entries(stats.clicksByCountry).map(
      ([location, clicks]) => ({
        location,
        clicks,
      })
    ),
    clicksByCity: Object.entries(stats.clicksByCity).map(
      ([location, clicks]) => ({
        location,
        clicks,
      })
    ),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-4">
      <Card>
        <CardHeader>
          <div>
            <h3 className="font-semibold">Short URL</h3>
            <p className="text-blue-600 hover:underline cursor-pointer">
              <a
                href={`${import.meta.env.VITE_BACKEND_API_URL}/${
                  fullStats.shortCode
                }`}
                target="_blank"
              >
                {`${import.meta.env.VITE_BACKEND_API_URL}/${
                  fullStats.shortCode
                }`}
              </a>
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="col-span-2">
            <h3 className="font-semibold">Original URL</h3>
            <p className="truncate">{fullStats.originalUrl}</p>
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            <p>{new Date(fullStats.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Updated At</h3>
            <p>
              {fullStats.updatedAt
                ? new Date(fullStats.updatedAt).toLocaleDateString()
                : "------"}
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Total Clicks</h3>
            <p>{fullStats.totalClicks}</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <LineChartStats clicksByDate={fullStats.clicksByDate} />

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Top Visitors By Country</CardTitle>
          <CardDescription>Visitor countries</CardDescription>
        </CardHeader>
        <CardContent>
          {fullStats.clicksByCountry.length === 0 ? (
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
                {fullStats.clicksByCountry.map(({ location, clicks }) => (
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
          {fullStats.clicksByCity.length === 0 ? (
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
                {fullStats.clicksByCity.map(({ location, clicks }) => (
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

      <DeviceStats clicksByDeviceType={fullStats.clicksByDeviceType} />

      <Separator />
    </div>
  );
}
