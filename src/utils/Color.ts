export function hexToRgb(hex: string) {
	// Remove o '#' se estiver presente
	hex = hex.replace(/^#/, "")

	// Converte a string HEX para valores RGB
	let bigint = parseInt(hex, 16)
	let r = (bigint >> 16) & 255
	let g = (bigint >> 8) & 255
	let b = bigint & 255

	return [r, g, b]
}

export function getRelativeLuminance(r: number, g: number, b: number) {
	// Converte RGB para valores entre 0 e 1
	r = r / 255
	g = g / 255
	b = b / 255

	// Calcular a luminância relativa
	r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
	g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
	b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

	return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Função para determinar a cor ideal do texto
export function getIdealTextColor(hex: string) {
	let [r, g, b] = hexToRgb(hex)
	let luminance = getRelativeLuminance(r, g, b)

	// Se a luminância for alta, retorna preto, caso contrário, retorna branco
	return luminance > 0.179 ? "#000000" : "#ffffff"
}
