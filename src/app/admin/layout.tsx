import type { ReactNode } from "react";

// Admin section gets its own layout — no public Navbar, Footer, or BTechLocationLinks
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
