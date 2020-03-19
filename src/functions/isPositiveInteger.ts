export default function isPositiveInteger(id: string | undefined): boolean {
  if (id !== undefined) {
    const realid = parseFloat(id)
    return /^[\d]*$/.test(id) && !isNaN(realid) && realid > 0
  } else {
    return false
  }
}
