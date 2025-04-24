export async function submitQuizResults(data: {
  archetype: string
  answers: Record<string, any>
  textInputs: Record<string, string>
}) {
  try {
    // Log the raw data to help with debugging
    console.log("Raw quiz data:", data)

    // Map the answers from the quiz format to the format expected by the Google Sheet
    // Using the actual question IDs from the quiz data structure
    const formData = {
      timestamp: new Date().toISOString(),
      participant_name: data.textInputs["participant_name"] || data.answers["participant_name"] || "",
      archetype: data.answers["archetype"] || data.archetype || "",

      // Emotional response questions
      ai_primary_emotion: data.answers["ai_primary_emotion"] || "",
      ai_future_outlook: data.answers["ai_future_outlook"] || "",
      ai_trust_score: data.answers["ai_trust_score"] || "",
      ai_metaphor: data.answers["ai_metaphor"] || "",

      // Usage questions
      ai_familiarity: data.answers["ai_familiarity"] || "",
      ai_tools: data.answers["ai_tools"] || "",
      ai_confidence: data.answers["ai_confidence"] || "",
      ai_use_case: data.answers["ai_use_case"] || "",
      learning_style: data.answers["learning_style"] || "",

      // Industry impact questions
      ai_sentiment_student_housing: data.answers["ai_sentiment_student_housing"] || "",
      ai_creativity_impact: data.answers["ai_creativity_impact"] || "",

      // Reflection questions
      ai_creativity_effect: data.answers["ai_creativity_effect"] || "",
      ai_biggest_fear: data.answers["ai_biggest_fear"] || "",
      ai_biggest_hope: data.answers["ai_biggest_hope"] || data.textInputs["ai_biggest_hope"] || "",

      // Workshop questions
      session_interest: data.answers["session_interest"] || "",
      ai_workshop_interest: data.answers["ai_workshop_interest"] || "",

      // Bonus questions
      ai_barrier: data.answers["ai_barrier"] || "",
      ai_tool_frequency: data.answers["ai_tool_frequency"] || "",
      ai_word_future: data.answers["ai_word_future"] || data.textInputs["ai_word_future"] || "",
    }

    // Log the formatted data being sent to Google Sheets
    console.log("Formatted data for Google Sheets:", formData)

    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbxOQ0S5UAeRAGsaNAr4cVYULG6kle4wsaUyAzKs7_jKrifs8YH-_Z9qKxrrF4-DxJE5Qw/exec"

    // Create and submit form (bypasses CORS)
    const form = document.createElement("form")
    form.method = "POST"
    form.action = scriptUrl
    form.target = "_blank"

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = String(value)
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    return {
      success: true,
      message: "Results submitted via form. Check the sheet!",
    }
  } catch (error) {
    console.error("Submission failed:", error)
    return {
      success: false,
      message: "Submission failed. Please try again.",
    }
  }
}
