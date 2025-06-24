"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Globe,
  Palette,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// TypeScript interfaces
interface UserSettings {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin: string;
  status: "active" | "inactive";
}

interface SystemLog {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  timestamp: string;
  user: string;
}

// Mock data
const usersData: UserSettings[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    permissions: ["read", "write", "delete", "admin"],
    lastLogin: "2024-01-15 10:30:00",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Manager",
    permissions: ["read", "write"],
    lastLogin: "2024-01-15 09:15:00",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@company.com",
    role: "User",
    permissions: ["read"],
    lastLogin: "2024-01-14 16:45:00",
    status: "active",
  },
];

const systemLogs: SystemLog[] = [
  {
    id: "1",
    type: "info",
    message: "System backup completed successfully",
    timestamp: "2024-01-15 10:30:00",
    user: "System",
  },
  {
    id: "2",
    type: "warning",
    message: "Low disk space detected on server",
    timestamp: "2024-01-15 09:15:00",
    user: "System",
  },
  {
    id: "3",
    type: "success",
    message: "User login successful",
    timestamp: "2024-01-15 08:45:00",
    user: "john@company.com",
  },
  {
    id: "4",
    type: "error",
    message: "Failed to connect to database",
    timestamp: "2024-01-15 07:30:00",
    user: "System",
  },
];

const getLogIcon = (type: SystemLog["type"]) => {
  switch (type) {
    case "info":
      return <AlertCircle className="h-4 w-4 text-blue-600" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusBadge = (status: UserSettings["status"]) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Active
        </Badge>
      );
    case "inactive":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Inactive
        </Badge>
      );
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    lowStock: true,
    outOfStock: true,
    systemAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
  });

  const [appearance, setAppearance] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="Duraville IT" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input id="company-email" defaultValue="info@duraville.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone Number</Label>
                  <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Input id="company-address" defaultValue="123 Business St, City, State 12345" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Data Retention Period</Label>
                  <Select defaultValue="2years">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, push: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Low Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when items are running low
                      </p>
                    </div>
                    <Switch
                      checked={notifications.lowStock}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, lowStock: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Out of Stock Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when items are completely out
                      </p>
                    </div>
                    <Switch
                      checked={notifications.outOfStock}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, outOfStock: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify about system issues and maintenance
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, systemAlerts: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) =>
                      setSecurity({ ...security, twoFactor: checked })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) =>
                      setSecurity({ ...security, sessionTimeout: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Select
                    value={security.passwordExpiry}
                    onValueChange={(value) =>
                      setSecurity({ ...security, passwordExpiry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Select
                    value={security.loginAttempts}
                    onValueChange={(value) =>
                      setSecurity({ ...security, loginAttempts: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={appearance.theme}
                  onValueChange={(value) =>
                    setAppearance({ ...appearance, theme: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={appearance.language}
                  onValueChange={(value) =>
                    setAppearance({ ...appearance, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format">Date Format</Label>
                <Select
                  value={appearance.dateFormat}
                  onValueChange={(value) =>
                    setAppearance({ ...appearance, dateFormat: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">System Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage user accounts and permissions
                  </p>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemLogs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-3">
                      {getLogIcon(log.type)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{log.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.timestamp} • {log.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 