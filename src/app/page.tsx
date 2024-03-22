import { getUsers } from "@/actions/user/get"

export default async function Home() {
	const users = await getUsers()
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Usuários:</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id} className="flex items-center space-x-4">
						<span>{user.name}</span>
						<span>{user.email}</span>
					</li>
				))}

				{users.length === 0 && <p>Nenhum usuário encontrado</p>}
			</ul>
		</main>
	)
}
