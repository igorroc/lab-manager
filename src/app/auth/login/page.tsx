import { Metadata } from "next"

import Form from "./form"

export const metadata: Metadata = {
	title: "Login",
}

export default function Login() {
	return (
		<main>
			<Form />
		</main>
	)
}
