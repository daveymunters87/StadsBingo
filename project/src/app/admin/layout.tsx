export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout applies to all /admin routes
  // Authentication is handled by the (protected) group layout
  return <>{children}</>
}