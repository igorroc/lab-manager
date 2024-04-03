export function searchInText(text: string, search: string) {
	const textLower = text.toLowerCase()
	const searchLower = search.toLowerCase()

	const textNormalized = textLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
	const searchNormalized = searchLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

	return textNormalized.includes(searchNormalized)
}
