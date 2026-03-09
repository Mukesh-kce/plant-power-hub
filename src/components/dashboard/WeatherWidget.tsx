import { Card, CardContent } from "@/components/ui/card";
import { Sun, Thermometer, Wind, Droplets } from "lucide-react";

const weatherData = {
  condition: "Clear Sky",
  temperature: 34,
  humidity: 42,
  windSpeed: 12,
  irradiance: 880,
  sunrise: "06:12",
  sunset: "18:34",
};

export function WeatherWidget() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sun className="h-5 w-5 text-warning" />
          <div>
            <div className="text-xs font-medium text-foreground">{weatherData.condition}</div>
            <div className="text-[10px] text-muted-foreground">
              ☀ {weatherData.sunrise} — 🌙 {weatherData.sunset}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <Thermometer className="h-3.5 w-3.5 text-destructive" />
            <span className="text-muted-foreground">Temp</span>
            <span className="ml-auto font-semibold text-foreground">{weatherData.temperature}°C</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Droplets className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">Hum.</span>
            <span className="ml-auto font-semibold text-foreground">{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Wind className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">Wind</span>
            <span className="ml-auto font-semibold text-foreground">{weatherData.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Sun className="h-3.5 w-3.5 text-warning" />
            <span className="text-muted-foreground">GHI</span>
            <span className="ml-auto font-semibold text-foreground">{weatherData.irradiance} W/m²</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
