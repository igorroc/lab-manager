import { Metadata } from "next"

import Form from "./form"

export const metadata: Metadata = {
	title: "Super Login",
}

export default function SuperLogin() {
	return (
		<main>
			<Form />
		</main>
	)
}
