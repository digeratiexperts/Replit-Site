import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PortalLayout } from "./PortalLayout";
import { User, Lock, Bell, Shield } from "lucide-react";

export default function PortalSettings() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("portalUser");
    return stored ? JSON.parse(stored) : {};
  });

  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
  };

  return (
    <PortalLayout title="Settings">
      <div className="space-y-6 max-w-2xl">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#5034ff]" />
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="Your name"
                  data-testid="input-fullname"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                data-testid="button-save-profile"
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#5034ff]" />
              <div>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  type="password"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      current: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  data-testid="input-current-password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                  placeholder="••••••••"
                  data-testid="input-new-password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirm: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  data-testid="input-confirm-password"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#5034ff] hover:bg-[#5034ff]/90"
                data-testid="button-change-password"
              >
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#5034ff]" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Ticket Updates</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Notifications when tickets are updated
                  </p>
                </div>
                <input type="checkbox" defaultChecked data-testid="checkbox-ticket-updates" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Invoice Alerts</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Notifications for new invoices
                  </p>
                </div>
                <input type="checkbox" defaultChecked data-testid="checkbox-invoice-alerts" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Service Updates</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Notifications for service announcements
                  </p>
                </div>
                <input type="checkbox" defaultChecked data-testid="checkbox-service-updates" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#5034ff]" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                Your account is secure. Last login was today at 2:30 PM.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              data-testid="button-view-sessions"
            >
              View Active Sessions
            </Button>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
