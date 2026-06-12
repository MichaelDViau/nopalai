import { LogoMark } from "@/components/brand/logo";

export default function DashboardLoading() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <LogoMark className="h-10 w-10 animate-pulse" />
    </div>
  );
}
