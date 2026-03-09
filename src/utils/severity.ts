export function getSeverityColor(severity?: string | null) {
  switch (severity?.toLowerCase()) {
    case "high":
      return "bg-red-500/50 text-card-forground";
    case "medium":
      return "bg-yellow-500/50 text-card-forground";
    case "low":
      return "bg-green-500/50 text-card-forground";
    default:
      return "bg-muted text-muted-foreground";
  }
}
