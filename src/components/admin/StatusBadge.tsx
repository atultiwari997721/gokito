import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  "Order Received": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Preparing": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Out for Delivery": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Delivered": "bg-green-500/10 text-green-400 border-green-500/20",
  "Cancelled": "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StatusBadge({ status }: { status: string }) {
  const styles = STATUS_STYLES[status] || "bg-gray-500/10 text-gray-400";

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-medium border",
        styles
      )}
    >
      {status}
    </span>
  );
}
