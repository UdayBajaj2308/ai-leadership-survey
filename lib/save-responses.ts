/**
 * Save responses locally as a JSON file
 */
export function saveResponsesToFile(answers: Record<string, any>) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const filename = `ai-leadership-survey-${timestamp}.json`

  // Create the results object
  const resultsData = {
    timestamp: new Date().toISOString(),
    answers: answers,
  }

  // Convert to JSON
  const jsonData = JSON.stringify(resultsData, null, 2)

  // Create a blob and download link
  const blob = new Blob([jsonData], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()

  // Clean up
  setTimeout(() => {
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }, 100)

  return true
}
