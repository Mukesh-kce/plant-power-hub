import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { plants } from "@/data/mock-data";
import { HiMapPin } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const getHealthColor = (s: number) => s >= 85 ? "text-success" : s >= 70 ? "text-warning" : "text-destructive";

export default function Plants() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Solar Plants</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plants.map((p) => (
            <Card 
              key={p.id} 
              className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => navigate(`/plants/${p.id}`)}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <HiMapPin className="h-3 w-3" /> {p.location}
                    </p>
                  </div>
                  <div className={`text-2xl font-bold ${getHealthColor(p.healthScore)}`}>
                    {p.healthScore}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Capacity: {p.capacity.toLocaleString()} kWp</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
