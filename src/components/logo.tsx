import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md bg-white px-1.5 py-1",
        className
      )}
    >
      <Image
        src="/trustcode-systems-logo.png"
        alt="TrustCode Systems"
        width={1640}
        height={430}
        priority
        className="h-auto w-[178px] sm:w-[210px]"
      />
    </span>
  );
}
