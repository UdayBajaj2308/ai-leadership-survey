import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    console.log("API route received data:", formData)

    // Google Apps Script URL
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxOQ0S5UAeRAGsaNAr4cVYULG6kle4wsaUyAzKs7_jKrifs8YH-_Z9qKxrrF4-DxJE5Qw/exec"

    try {
      // Make the request to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        // Add these options to help with potential CORS or network issues
        cache: "no-store",
        next: { revalidate: 0 },
      })

      console.log("Google Apps Script response status:", response.status)

      const responseText = await response.text()
      console.log("Google Apps Script response text:", responseText)

      if (!response.ok) {
        throw new Error(`Google Apps Script responded with status: ${response.status}, message: ${responseText}`)
      }

      return NextResponse.json({ success: true, message: "Results saved successfully!" })
    } catch (fetchError) {
      console.error("Error fetching from Google Apps Script:", fetchError)

      // Try an alternative approach with URLSearchParams
      console.log("Trying alternative approach...")

      const params = new URLSearchParams()
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, String(value))
      })

      const alternativeResponse = await fetch(`${scriptUrl}?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
        next: { revalidate: 0 },
      })

      console.log("Alternative response status:", alternativeResponse.status)
      const alternativeText = await alternativeResponse.text()
      console.log("Alternative response text:", alternativeText)

      if (!alternativeResponse.ok) {
        throw new Error(`Alternative approach failed with status: ${alternativeResponse.status}`)
      }

      return NextResponse.json({ success: true, message: "Results saved successfully (alternative method)!" })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit results. Please try again." },
      { status: 500 },
    )
  }
}
