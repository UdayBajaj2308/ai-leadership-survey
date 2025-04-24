export async function submitResponses(data: Record<string, any>) {
  try {
    const form = document.getElementById("hiddenForm") as HTMLFormElement
    if (!form) {
      console.error("Hidden form not found")
      return { success: false, message: "Form not found" }
    }

    // Log the raw data to help with debugging
    console.log("Raw data for form submission:", data)

    // Create a formatted data object with all the fields needed for the Google Sheet
    // Using direct mappings to the actual question fields without derived logic
    const formData = {
      timestamp: new Date().toISOString(),
      participant_name: data.participant_name || "",
      archetype: data.archetype || "",

      // Map all fields directly from the answers object
      ai_primary_emotion: data.ai_primary_emotion || "",
      ai_sentiment_student_housing: data.ai_sentiment_student_housing || "",
      ai_tools: data.ai_tools || "",
      ai_creativity_impact: data.ai_creativity_impact || "",
      ai_confidence: data.ai_confidence || "",
      ai_metaphor: data.ai_metaphor || "",
      ai_biggest_hope: data.ai_biggest_hope || "",
      ai_workshop_interest: data.ai_workshop_interest || "",

      // Use actual values from the quiz, not derived calculations
      ai_familiarity: data.ai_familiarity || "",
      ai_use_case: data.ai_use_case || "",
      learning_style: data.learning_style || "",
      session_interest: data.session_interest || "",

      // Additional fields
      ai_word_future: data.ai_word_future || "",
      ai_future_outlook: data.ai_future_outlook || "",
      ai_trust_score: data.ai_trust_score || "",
      ai_creativity_effect: data.ai_creativity_effect || "",
      ai_biggest_fear: data.ai_biggest_fear || "",
      ai_barrier: data.ai_barrier || "",
      ai_tool_frequency: data.ai_tool_frequency || "",
    }

    console.log("Formatted form data:", formData)

    // Fill the form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement
      if (input) {
        input.value = String(value)
      } else {
        console.warn(`Form field not found: ${key}`)
      }
    })

    form.submit()

    return {
      success: true,
      message: "Results submitted successfully!",
    }
  } catch (err) {
    console.error("Submission failed:", err)
    return {
      success: false,
      message: "Submission failed. Please try again.",
    }
  }
}
