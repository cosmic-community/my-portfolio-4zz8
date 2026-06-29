export function formatDate(dateString?: string): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

export function formatDateRange(start?: string, end?: string, current?: boolean): string {
  const startStr = formatDate(start)
  if (current) {
    return startStr ? `${startStr} — Present` : 'Present'
  }
  const endStr = formatDate(end)
  if (startStr && endStr) return `${startStr} — ${endStr}`
  return startStr || endStr || ''
}