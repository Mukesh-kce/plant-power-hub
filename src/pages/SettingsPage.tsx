import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <Card className="bg-card border-border">
          <CardHeader><CardTitle className="text-sm text-muted-foreground">General Settings</CardTitle></CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Settings configuration will be available in a future update.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
