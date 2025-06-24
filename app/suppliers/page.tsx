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
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Filter,
  Phone,
  Mail,
  Globe,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

// TypeScript interfaces
interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  category: string;
  rating: number;
  status: "active" | "inactive" | "pending";
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  paymentTerms: string;
}

// Mock data
const suppliersData: Supplier[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    contactPerson: "Mike Johnson",
    email: "mike@techcorp.com",
    phone: "+1 (555) 123-4567",
    website: "www.techcorp.com",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    category: "Electronics",
    rating: 4.8,
    status: "active",
    totalOrders: 45,
    totalSpent: 125000,
    lastOrderDate: "2024-01-15",
    paymentTerms: "Net 30",
  },
  {
    id: "2",
    name: "FurniMax Industries",
    contactPerson: "Sarah Williams",
    email: "sarah@furnimax.com",
    phone: "+1 (555) 234-5678",
    website: "www.furnimax.com",
    address: "456 Furniture Ave, Chicago, IL 60601",
    category: "Furniture",
    rating: 4.5,
    status: "active",
    totalOrders: 32,
    totalSpent: 89000,
    lastOrderDate: "2024-01-14",
    paymentTerms: "Net 45",
  },
  {
    id: "3",
    name: "AccessoryPlus Co.",
    contactPerson: "David Chen",
    email: "david@accessoryplus.com",
    phone: "+1 (555) 345-6789",
    website: "www.accessoryplus.com",
    address: "789 Accessory Blvd, Miami, FL 33101",
    category: "Accessories",
    rating: 4.2,
    status: "active",
    totalOrders: 28,
    totalSpent: 67000,
    lastOrderDate: "2024-01-13",
    paymentTerms: "Net 30",
  },
  {
    id: "4",
    name: "SoundTech Audio",
    contactPerson: "Lisa Rodriguez",
    email: "lisa@soundtech.com",
    phone: "+1 (555) 456-7890",
    website: "www.soundtech.com",
    address: "321 Audio Lane, Nashville, TN 37201",
    category: "Electronics",
    rating: 4.7,
    status: "active",
    totalOrders: 38,
    totalSpent: 95000,
    lastOrderDate: "2024-01-12",
    paymentTerms: "Net 30",
  },
  {
    id: "5",
    name: "LightCo Lighting",
    contactPerson: "Robert Brown",
    email: "robert@lightco.com",
    phone: "+1 (555) 567-8901",
    website: "www.lightco.com",
    address: "654 Light Street, Las Vegas, NV 89101",
    category: "Lighting",
    rating: 4.3,
    status: "pending",
    totalOrders: 15,
    totalSpent: 42000,
    lastOrderDate: "2024-01-10",
    paymentTerms: "Net 30",
  },
  {
    id: "6",
    name: "ErgoTech Solutions",
    contactPerson: "Jennifer Davis",
    email: "jennifer@ergotech.com",
    phone: "+1 (555) 678-9012",
    website: "www.ergotech.com",
    address: "987 Ergo Way, Seattle, WA 98101",
    category: "Accessories",
    rating: 4.6,
    status: "inactive",
    totalOrders: 22,
    totalSpent: 58000,
    lastOrderDate: "2023-12-20",
    paymentTerms: "Net 30",
  },
];

const getStatusBadge = (status: Supplier["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" />
          Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="mr-1 h-3 w-3" />
          Inactive
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

const getRatingStars = (rating: number) => {
  return (
    <div className="flex items-center">
      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <span className="ml-1 text-sm">{rating}</span>
    </div>
  );
};

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate supplier stats
  const totalSuppliers = suppliersData.length;
  const activeSuppliers = suppliersData.filter(
    (supplier) => supplier.status === "active"
  ).length;
  const totalSpent = suppliersData.reduce(
    (sum, supplier) => sum + supplier.totalSpent,
    0
  );
  const averageRating = suppliersData.reduce(
    (sum, supplier) => sum + supplier.rating,
    0
  ) / suppliersData.length;

  // Filter suppliers data
  const filteredData = suppliersData.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || supplier.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || supplier.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(suppliersData.map((supplier) => supplier.category))
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Management</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Supplier Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              All suppliers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeSuppliers}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              ${totalSpent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              All time spending
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Supplier satisfaction
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
                  placeholder="Search suppliers by name, contact person, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">{supplier.website}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{supplier.contactPerson}</div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {supplier.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {supplier.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>{getRatingStars(supplier.rating)}</TableCell>
                  <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                  <TableCell>{supplier.totalOrders}</TableCell>
                  <TableCell>${supplier.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{supplier.lastOrderDate}</TableCell>
                  <TableCell>{supplier.paymentTerms}</TableCell>
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
                        <DropdownMenuItem>Edit supplier</DropdownMenuItem>
                        <DropdownMenuItem>View orders</DropdownMenuItem>
                        <DropdownMenuItem>Contact supplier</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Deactivate
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
              No suppliers found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 