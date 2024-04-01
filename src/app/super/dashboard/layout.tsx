import AdminSidebar from "@/components/AdminSidebar"

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<AdminSidebar />
			<main className="ml-64 p-14">{children}</main>
		</div>
	)
}
