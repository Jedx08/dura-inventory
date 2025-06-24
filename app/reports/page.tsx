"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// TypeScript interfaces
interface ReportData {
  id: string;
  name: string;
  type: "inventory" | "sales" | "supplier" | "financial";
  lastGenerated: string;
  status: "ready" | "generating" | "failed";
  size: string;
  format: "PDF" | "Excel" | "CSV";
}

interface ChartData {
  month: string;
  revenue: number;
  orders: number;
  items: number;
}

// Mock data
const reportsData: ReportData[] = [
  {
    id: "1",
    name: "Monthly Inventory Report",
    type: "inventory",
    lastGenerated: "2024-01-15",
    status: "ready",
    size: "2.3 MB",
    format: "PDF",
  },
  {
    id: "2",
    name: "Q4 Sales Analysis",
    type: "sales",
    lastGenerated: "2024-01-10",
    status: "ready",
    size: "1.8 MB",
    format: "Excel",
  },
  {
    id: "3",
    name: "Supplier Performance Report",
    type: "supplier",
    lastGenerated: "2024-01-08",
    status: "ready",
    size: "3.1 MB",
    format: "PDF",
  },
  {
    id: "4",
    name: "Financial Summary 2023",
    type: "financial",
    lastGenerated: "2024-01-05",
    status: "ready",
    size: "4.2 MB",
    format: "Excel",
  },
  {
    id: "5",
    name: "Low Stock Alert Report",
    type: "inventory",
    lastGenerated: "2024-01-14",
    status: "generating",
    size: "0.5 MB",
    format: "CSV",
  },
];

const chartData: ChartData[] = [
  { month: "Jan", revenue: 45000, orders: 120, items: 850 },
  { month: "Feb", revenue: 52000, orders: 135, items: 920 },
  { month: "Mar", revenue: 48000, orders: 128, items: 880 },
  { month: "Apr", revenue: 61000, orders: 155, items: 1050 },
  { month: "May", revenue: 55000, orders: 142, items: 980 },
  { month: "Jun", revenue: 67000, orders: 168, items: 1150 },
];

const getStatusBadge = (status: ReportData["status"]) => {
  switch (status) {
    case "ready":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Ready
        </Badge>
      );
    case "generating":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Generating
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getTypeIcon = (type: ReportData["type"]) => {
  switch (type) {
    case "inventory":
      return <Package className="h-4 w-4" />;
    case "sales":
      return <ShoppingCart className="h-4 w-4" />;
    case "supplier":
      return <Users className="h-4 w-4" />;
    case "financial":
      return <DollarSign className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [reportType, setReportType] = useState("all");

  // Calculate stats
  const totalReports = reportsData.length;
  const readyReports = reportsData.filter(
    (report) => report.status === "ready"
  ).length;
  const totalRevenue = chartData.reduce((sum, data) => sum + data.revenue, 0);
  const avgRevenue = totalRevenue / chartData.length;

  // Calculate trends
  const currentRevenue = chartData[chartData.length - 1].revenue;
  const previousRevenue = chartData[chartData.length - 2].revenue;
  const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  const currentOrders = chartData[chartData.length - 1].orders;
  const previousOrders = chartData[chartData.length - 2].orders;
  const ordersChange = ((currentOrders - previousOrders) / previousOrders) * 100;

  // Filter reports data
  const filteredReports = reportsData.filter((report) => {
    return reportType === "all" || report.type === reportType;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">
              Available reports
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready Reports</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {readyReports}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for download
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-xs">
              {revenueChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <span className={revenueChange >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(revenueChange).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              ${avgRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 6 months average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(data.revenue / Math.max(...chartData.map(d => d.revenue))) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Orders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold">{currentOrders}</span>
                  <div className="flex items-center text-xs">
                    {ordersChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-600" />
                    )}
                    <span className={ordersChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {Math.abs(ordersChange).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Items Sold</span>
                </div>
                <span className="text-sm font-bold">{chartData[chartData.length - 1].items}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Active Suppliers</span>
                </div>
                <span className="text-sm font-bold">12</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(report.type)}
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.lastGenerated}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {report.status === "ready" && (
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No reports found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 