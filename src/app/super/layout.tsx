import AdminContent from "@/components/AdminContent"
import AdminSidebar from "@/components/AdminSidebar"

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<AdminSidebar />
			<AdminContent>{children}</AdminContent>
		</div>
	)
}
