// Helper for fetch error handling and JSON
const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

module.exports = {
  fetchJson
}
