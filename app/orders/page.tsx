"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ShoppingCart,
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  Package,
} from "lucide-react";

// TypeScript interfaces
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  expectedDelivery: string;
  shippingAddress: string;
  paymentStatus: "paid" | "pending" | "failed";
}

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

// Mock data
const ordersData: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    items: [
      { id: "1", name: "Wireless Headphones", sku: "WH-001", quantity: 2, price: 99.99 },
      { id: "2", name: "Bluetooth Speaker", sku: "BS-004", quantity: 1, price: 79.99 },
    ],
    totalAmount: 279.97,
    status: "delivered",
    orderDate: "2024-01-10",
    expectedDelivery: "2024-01-15",
    shippingAddress: "123 Main St, City, State 12345",
    paymentStatus: "paid",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    items: [
      { id: "3", name: "Office Chair", sku: "OC-002", quantity: 1, price: 249.99 },
    ],
    totalAmount: 249.99,
    status: "processing",
    orderDate: "2024-01-12",
    expectedDelivery: "2024-01-18",
    shippingAddress: "456 Oak Ave, City, State 12345",
    paymentStatus: "paid",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerName: "Mike Wilson",
    customerEmail: "mike.w@email.com",
    items: [
      { id: "4", name: "Desk Lamp", sku: "DL-005", quantity: 3, price: 34.99 },
      { id: "5", name: "Ergonomic Mouse", sku: "EM-006", quantity: 2, price: 29.99 },
    ],
    totalAmount: 164.95,
    status: "pending",
    orderDate: "2024-01-14",
    expectedDelivery: "2024-01-20",
    shippingAddress: "789 Pine Rd, City, State 12345",
    paymentStatus: "pending",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customerName: "Lisa Brown",
    customerEmail: "lisa.b@email.com",
    items: [
      { id: "6", name: "Laptop Stand", sku: "LS-003", quantity: 1, price: 39.99 },
    ],
    totalAmount: 39.99,
    status: "cancelled",
    orderDate: "2024-01-13",
    expectedDelivery: "2024-01-17",
    shippingAddress: "321 Elm St, City, State 12345",
    paymentStatus: "failed",
  },
];

const getStatusBadge = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Package className="mr-1 h-3 w-3" />
          Processing
        </Badge>
      );
    case "shipped":
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          <Package className="mr-1 h-3 w-3" />
          Shipped
        </Badge>
      );
    case "delivered":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Delivered
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getPaymentStatusBadge = (status: Order["paymentStatus"]) => {
  switch (status) {
    case "paid":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
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

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Calculate order stats
  const totalOrders = ordersData.length;
  const pendingOrders = ordersData.filter(
    (order) => order.status === "pending"
  ).length;
  const processingOrders = ordersData.filter(
    (order) => order.status === "processing"
  ).length;
  const totalRevenue = ordersData
    .filter((order) => order.paymentStatus === "paid")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // Filter orders data
  const filteredData = ordersData.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Order Management</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              All time orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {processingOrders}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently processing
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From paid orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by number, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit order</DropdownMenuItem>
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                        <DropdownMenuItem>Print invoice</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Cancel order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No orders found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 