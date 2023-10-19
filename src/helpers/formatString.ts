export function formatString(text: string): string {
  return text.replace(/[^a-zA-Z\s]/g, '').toLowerCase()
}
