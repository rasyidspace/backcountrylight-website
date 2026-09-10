"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function ConditionalHeaderFooter({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && header}
      <main className="flex-1">{children}</main>
      {!isAdmin && footer}
    </>
  );
}
