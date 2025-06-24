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
  AlertTriangle,
  Search,
  Filter,
  Bell,
  Package,
  ShoppingCart,
  Users,
  Settings,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";

// TypeScript interfaces
interface Alert {
  id: string;
  type: "low-stock" | "out-of-stock" | "system" | "order" | "supplier";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string;
  itemName?: string;
  sku?: string;
  currentStock?: number;
  minStock?: number;
  supplier?: string;
  timestamp: string;
  status: "active" | "acknowledged" | "resolved";
  priority: number;
}

// Mock data
const alertsData: Alert[] = [
  {
    id: "1",
    type: "low-stock",
    severity: "high",
    title: "Low Stock Alert",
    description: "Item is running low on stock and needs reordering",
    itemName: "Office Chair",
    sku: "OC-002",
    currentStock: 8,
    minStock: 15,
    supplier: "FurniMax",
    timestamp: "2024-01-15 10:30:00",
    status: "active",
    priority: 1,
  },
  {
    id: "2",
    type: "out-of-stock",
    severity: "critical",
    title: "Out of Stock Alert",
    description: "Item is completely out of stock",
    itemName: "Laptop Stand",
    sku: "LS-003",
    currentStock: 0,
    minStock: 5,
    supplier: "AccessoryPlus",
    timestamp: "2024-01-15 09:15:00",
    status: "active",
    priority: 1,
  },
  {
    id: "3",
    type: "low-stock",
    severity: "medium",
    title: "Low Stock Alert",
    description: "Item is approaching minimum stock level",
    itemName: "Ergonomic Mouse",
    sku: "EM-006",
    currentStock: 3,
    minStock: 10,
    supplier: "ErgoTech",
    timestamp: "2024-01-15 08:45:00",
    status: "acknowledged",
    priority: 2,
  },
  {
    id: "4",
    type: "system",
    severity: "low",
    title: "System Maintenance",
    description: "Scheduled system maintenance in 2 hours",
    timestamp: "2024-01-15 07:30:00",
    status: "active",
    priority: 3,
  },
  {
    id: "5",
    type: "supplier",
    severity: "medium",
    title: "Supplier Delay",
    description: "Expected delivery delayed by 3 days",
    supplier: "TechCorp",
    timestamp: "2024-01-14 16:20:00",
    status: "active",
    priority: 2,
  },
  {
    id: "6",
    type: "order",
    severity: "high",
    title: "Order Issue",
    description: "Payment failed for order ORD-2024-004",
    timestamp: "2024-01-14 14:10:00",
    status: "resolved",
    priority: 1,
  },
];

const getSeverityBadge = (severity: Alert["severity"]) => {
  switch (severity) {
    case "critical":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Critical
        </Badge>
      );
    case "high":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <AlertCircle className="mr-1 h-3 w-3" />
          High
        </Badge>
      );
    case "medium":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="mr-1 h-3 w-3" />
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Info className="mr-1 h-3 w-3" />
          Low
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getStatusBadge = (status: Alert["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Active
        </Badge>
      );
    case "acknowledged":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Acknowledged
        </Badge>
      );
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Resolved
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getTypeIcon = (type: Alert["type"]) => {
  switch (type) {
    case "low-stock":
    case "out-of-stock":
      return <Package className="h-4 w-4" />;
    case "order":
      return <ShoppingCart className="h-4 w-4" />;
    case "supplier":
      return <Users className="h-4 w-4" />;
    case "system":
      return <Settings className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate alert stats
  const totalAlerts = alertsData.length;
  const activeAlerts = alertsData.filter(
    (alert) => alert.status === "active"
  ).length;
  const criticalAlerts = alertsData.filter(
    (alert) => alert.severity === "critical"
  ).length;
  const resolvedAlerts = alertsData.filter(
    (alert) => alert.status === "resolved"
  ).length;

  // Filter alerts data
  const filteredData = alertsData.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.itemName && alert.itemName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.sku && alert.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;
    const matchesType =
      typeFilter === "all" || alert.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesType && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Alert Settings
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              All alerts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {activeAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {criticalAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              Immediate action needed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {resolvedAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully handled
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
                  placeholder="Search alerts by title, description, item name, or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="order">Order</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Item Details</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(alert.type)}
                      <span className="capitalize">{alert.type.replace('-', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                  <TableCell>{getStatusBadge(alert.status)}</TableCell>
                  <TableCell>
                    {alert.itemName ? (
                      <div className="text-sm">
                        <div className="font-medium">{alert.itemName}</div>
                        <div className="text-muted-foreground">SKU: {alert.sku}</div>
                        {alert.currentStock !== undefined && (
                          <div className="text-muted-foreground">
                            Stock: {alert.currentStock}/{alert.minStock}
                          </div>
                        )}
                        {alert.supplier && (
                          <div className="text-muted-foreground">Supplier: {alert.supplier}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
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
                        <DropdownMenuItem>Acknowledge</DropdownMenuItem>
                        <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
                        {alert.type === "low-stock" || alert.type === "out-of-stock" ? (
                          <DropdownMenuItem>Create purchase order</DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Dismiss alert
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
              No alerts found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 