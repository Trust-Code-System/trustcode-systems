import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex", className)}>
      <Image
        src="/trustcode-systems-logo.png"
        alt="TrustCode System"
        width={1640}
        height={430}
        priority
        className="h-auto w-[178px] dark:hidden sm:w-[210px]"
      />
      <Image
        src="/trustcode-system-logo-dark.png"
        alt="TrustCode System"
        width={1640}
        height={430}
        priority
        className="hidden h-auto w-[178px] dark:block sm:w-[210px]"
      />
    </span>
  );
}
