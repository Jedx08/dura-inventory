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
  TrendingUp,
  Calendar,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
  Eye,
  MousePointer,
} from "lucide-react";

// TypeScript interfaces
interface AnalyticsData {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  conversionRate: number;
  avgOrderValue: number;
  topProduct: string;
  topCategory: string;
}

interface TopProduct {
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

// Mock data
const analyticsData: AnalyticsData[] = [
  {
    period: "Jan 2024",
    revenue: 45000,
    orders: 120,
    customers: 85,
    conversionRate: 3.2,
    avgOrderValue: 375,
    topProduct: "Wireless Headphones",
    topCategory: "Electronics",
  },
  {
    period: "Feb 2024",
    revenue: 52000,
    orders: 135,
    customers: 92,
    conversionRate: 3.8,
    avgOrderValue: 385,
    topProduct: "Office Chair",
    topCategory: "Furniture",
  },
  {
    period: "Mar 2024",
    revenue: 48000,
    orders: 128,
    customers: 88,
    conversionRate: 3.5,
    avgOrderValue: 375,
    topProduct: "Bluetooth Speaker",
    topCategory: "Electronics",
  },
];

const topProducts: TopProduct[] = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sales: 45,
    revenue: 4495.55,
    growth: 12.5,
  },
  {
    name: "Office Chair",
    category: "Furniture",
    sales: 32,
    revenue: 7999.68,
    growth: 8.3,
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    sales: 38,
    revenue: 3039.62,
    growth: 15.2,
  },
  {
    name: "Desk Lamp",
    category: "Lighting",
    sales: 28,
    revenue: 979.72,
    growth: 5.7,
  },
  {
    name: "Ergonomic Mouse",
    category: "Accessories",
    sales: 25,
    revenue: 749.75,
    growth: 3.1,
  },
];

const getGrowthIcon = (growth: number) => {
  return growth >= 0 ? (
    <ArrowUpRight className="h-4 w-4 text-green-600" />
  ) : (
    <ArrowDownRight className="h-4 w-4 text-red-600" />
  );
};

const getGrowthColor = (growth: number) => {
  return growth >= 0 ? "text-green-600" : "text-red-600";
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("3months");
  const [metric, setMetric] = useState("revenue");

  // Calculate current period data
  const currentData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[analyticsData.length - 2];

  // Calculate growth rates
  const revenueGrowth = ((currentData.revenue - previousData.revenue) / previousData.revenue) * 100;
  const ordersGrowth = ((currentData.orders - previousData.orders) / previousData.orders) * 100;
  const customersGrowth = ((currentData.customers - previousData.customers) / previousData.customers) * 100;

  // Calculate totals
  const totalRevenue = analyticsData.reduce((sum, data) => sum + data.revenue, 0);
  const totalOrders = analyticsData.reduce((sum, data) => sum + data.orders, 0);
  const totalCustomers = analyticsData.reduce((sum, data) => sum + data.customers, 0);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(revenueGrowth)}
              <span className={getGrowthColor(revenueGrowth)}>
                {Math.abs(revenueGrowth).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(ordersGrowth)}
              <span className={getGrowthColor(ordersGrowth)}>
                {Math.abs(ordersGrowth).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(customersGrowth)}
              <span className={getGrowthColor(customersGrowth)}>
                {Math.abs(customersGrowth).toFixed(1)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Current period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Order Value</span>
                <span className="text-sm font-bold">${currentData.avgOrderValue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Top Product</span>
                <span className="text-sm text-muted-foreground">{currentData.topProduct}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Top Category</span>
                <span className="text-sm text-muted-foreground">{currentData.topCategory}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.map((data, index) => (
                <div key={data.period} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.period}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(data.revenue / Math.max(...analyticsData.map(d => d.revenue))) * 100}%`
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
              <Zap className="h-5 w-5" />
              Quick Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-sm font-medium">High Conversion</div>
                  <div className="text-xs text-muted-foreground">Electronics category performing well</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MousePointer className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-sm font-medium">Customer Growth</div>
                  <div className="text-xs text-muted-foreground">8.2% increase in new customers</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-sm font-medium">Inventory Alert</div>
                  <div className="text-xs text-muted-foreground">3 items running low on stock</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Top Performing Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getGrowthIcon(product.growth)}
                      <span className={getGrowthColor(product.growth)}>
                        {Math.abs(product.growth).toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm font-medium">Electronics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm font-medium">Furniture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-sm font-medium">Accessories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "15%" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  <span className="text-sm font-medium">Lighting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "10%" }} />
                  </div>
                  <span className="text-sm text-muted-foreground">10%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.map((data, index) => (
                <div key={data.period} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.period}</span>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-bold">${data.revenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{data.orders} orders</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{data.customers}</div>
                      <div className="text-xs text-muted-foreground">customers</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 