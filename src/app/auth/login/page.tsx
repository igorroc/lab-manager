import { Metadata } from "next"

import Form from "./form"

export const metadata: Metadata = {
	title: "Login",
}

export default function Login() {
	return (
		<main className="h-dvh flex items-center justify-center">
			<Form />
		</main>
	)
}
