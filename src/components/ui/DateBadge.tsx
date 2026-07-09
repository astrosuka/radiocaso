export default function DateBadge({ date }: { date: string }) {
  const formattedDate = new Date(date).toLocaleString("es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return <div className="font-ibm text-sm">{formattedDate}</div>;
}
