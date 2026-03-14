import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plants } from "@/data/mock-data";
import { HiMapPin } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const getHealthBg = (score: number) => {
  if (score >= 85) return "bg-success";
  if (score >= 70) return "bg-warning";
  return "bg-destructive";
};

export function PlantMapOverview() {
  const navigate = useNavigate();

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Plant Portfolio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {plants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => navigate(`/plants/${plant.id}`)}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/60 cursor-pointer transition-colors"
          >
            <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${getHealthBg(plant.healthScore)}`} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">{plant.name}</div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <HiMapPin className="h-2.5 w-2.5" />
                {plant.location}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-bold text-foreground">{plant.healthScore}</div>
              <div className="text-[10px] text-muted-foreground">{(plant.capacity / 1000).toFixed(1)} MWp</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
