export default function DateBadge({ date }: { date: string }) {
  const formattedDate = new Date(date).toLocaleString("es", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return <div className="text-xs">{formattedDate}</div>;
}
