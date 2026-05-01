import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "default" | "white";
  className?: string;
  withLink?: boolean;
}

export function Logo({ variant = "default", className, withLink = true }: LogoProps) {
  const src =
    variant === "white"
      ? "/images/logo-solaris-pv-white.png"
      : "/images/logo-solaris-pv.png";
  const inner = (
    <Image
      src={src}
      alt="Solaris PV – Photovoltaik aus Moers"
      width={240}
      height={78}
      priority
      className={className ?? "h-10 w-auto md:h-12"}
    />
  );
  if (!withLink) return inner;
  return (
    <Link
      href="/"
      aria-label="Solaris PV – Startseite"
      className="inline-flex items-center"
    >
      {inner}
    </Link>
  );
}
