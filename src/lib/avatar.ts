export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function avatarColor(id: string): string {
  const colors = ['#E6E6E6', '#D4D4D4', '#C4C4C4', '#B8B8B8', '#A3A3A3']
  const idx = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length
  return colors[idx] ?? colors[0]
}
