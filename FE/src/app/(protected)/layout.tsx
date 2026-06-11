import AppBootstrap from "@/components/layout/app-bootstrap";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppBootstrap>{children}</AppBootstrap>;
}
