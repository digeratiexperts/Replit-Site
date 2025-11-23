import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail, Lock, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import logoImage from "@assets/DE-Logo-new_1762461524794.webp";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("portalUser", JSON.stringify(data.user));
      localStorage.setItem("portalToken", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.user?.id || "portal-user");
      localStorage.setItem("userEmail", email);
      navigate("/portal/dashboard");
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030228] to-[#0f0d2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logoImage}
            alt="Digerati Experts"
            className="h-10 w-auto"
          />
        </div>

        <Card className="bg-white/10 border-white/20 backdrop-blur">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white">Client Portal</CardTitle>
            <CardDescription className="text-gray-300">
              Sign in to access your account and manage support
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="your@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                    required
                    data-testid="input-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5034ff] hover:bg-[#5034ff]/90 text-white font-semibold"
                data-testid="button-login"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400 text-center">
                Need help? Contact support@digerati-experts.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
