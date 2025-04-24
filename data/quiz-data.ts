// Question Types
export type Question = {
  id: number
  fieldName: string
  text: string
  type: QuestionType
  options?: any[]
  required?: boolean
}

export type QuestionType = "emoji" | "radio" | "slider" | "swipe" | "multi-select" | "text-input" | "name-input"

// Archetype Types
export type ArchetypeKey = "explorer" | "strategist" | "innovator" | "skeptic" | "observer"

export type Archetype = {
  name: string
  description: string
  strengths: string[]
  growthAreas: string[]
  recommendations: string[]
  color: string
}

// Questions Data
export const questions: Question[] = [
  // Participant Information
  {
    id: 1,
    fieldName: "participant_name",
    text: "What's your name?",
    type: "name-input",
    required: true,
  },

  // Section 1: Emotional Framing & Attitude Toward AI
  {
    id: 2,
    fieldName: "ai_primary_emotion",
    text: "How would you describe your emotional response to AI?",
    type: "emoji",
    options: [
      { value: "curious", label: "Curious", emoji: "🧐" },
      { value: "excited", label: "Excited", emoji: "🚀" },
      { value: "anxious", label: "Anxious", emoji: "😰" },
      { value: "skeptical", label: "Skeptical", emoji: "🤔" },
      { value: "empowered", label: "Empowered", emoji: "💪" },
      { value: "indifferent", label: "Indifferent", emoji: "😐" },
    ],
  },
  {
    id: 3,
    fieldName: "ai_future_outlook",
    text: "Do you believe AI is a threat or an opportunity for your work?",
    type: "swipe",
    options: [
      { value: "opportunity", label: "Mostly an opportunity" },
      { value: "both", label: "Both" },
      { value: "threat", label: "Mostly a threat" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: 4,
    fieldName: "ai_trust_score",
    text: "On a scale of 1-5, how much do you trust AI tools right now?",
    type: "slider",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Considerably" },
      { value: 5, label: "Completely" },
    ],
  },
  {
    id: 5,
    fieldName: "ai_metaphor",
    text: "If AI were a person, how would you describe it?",
    type: "radio",
    options: [
      { value: "helpful_intern", label: "A helpful intern" },
      { value: "mad_scientist", label: "A mad scientist" },
      { value: "silent_partner", label: "A silent partner" },
      { value: "rebel", label: "A rebel" },
      { value: "mirror", label: "A mirror" },
      { value: "other", label: "Other" },
    ],
  },

  // Section 2: Archetype Discovery & Usage Styles
  {
    id: 6,
    fieldName: "ai_familiarity",
    text: "How familiar are you with using AI tools?",
    type: "radio",
    options: [
      { value: "not_at_all", label: "Not at all" },
      { value: "heard_of_them", label: "I've heard of them" },
      { value: "tried_a_few", label: "I've tried a few" },
      { value: "use_weekly", label: "I use them weekly" },
      { value: "use_daily", label: "I use them daily" },
    ],
  },
  {
    id: 7,
    fieldName: "archetype",
    text: "Which best describes your relationship with AI?",
    type: "radio",
    options: [
      { value: "explorer", label: "The Explorer: Curious and open to experimentation" },
      { value: "strategist", label: "The Strategist: Methodical and focused on business value" },
      { value: "observer", label: "The Observer: Watching developments with interest" },
      { value: "skeptic", label: "The Skeptic: Cautious about adoption and implications" },
      { value: "innovator", label: "The Innovator: Pushing boundaries and creating new applications" },
    ],
  },
  {
    id: 8,
    fieldName: "ai_use_case",
    text: "What do you mainly use AI for (or want to)?",
    type: "multi-select",
    options: [
      { value: "writing", label: "Writing" },
      { value: "data_analysis", label: "Data Analysis" },
      { value: "design", label: "Design" },
      { value: "coding", label: "Coding" },
      { value: "brainstorming", label: "Brainstorming" },
      { value: "presentations", label: "Presentations" },
      { value: "planning", label: "Planning" },
    ],
  },
  {
    id: 9,
    fieldName: "ai_tools",
    text: "Which AI tool are you most interested in exploring?",
    type: "radio",
    options: [
      { value: "chatgpt", label: "ChatGPT" },
      { value: "copilot", label: "Copilot" },
      { value: "claude", label: "Claude" },
      { value: "deepseek", label: "DeepSeek" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: 10,
    fieldName: "ai_confidence",
    text: "How confident are you in using AI tools?",
    type: "slider",
    options: [
      { value: 1, label: "Not confident" },
      { value: 2, label: "Slightly confident" },
      { value: 3, label: "Moderately confident" },
      { value: 4, label: "Very confident" },
      { value: 5, label: "Extremely confident" },
    ],
  },
  {
    id: 11,
    fieldName: "learning_style",
    text: "When it comes to AI, which best describes your approach?",
    type: "radio",
    options: [
      { value: "learn_by_doing", label: "Learn by doing" },
      { value: "video_tutorials", label: "Prefer video tutorials" },
      { value: "formal_documentation", label: "I like formal documentation" },
      { value: "wait_for_others", label: "I wait for others to test first" },
    ],
  },

  // Section 3: AI in Student Housing Industry
  {
    id: 12,
    fieldName: "ai_sentiment_student_housing",
    text: "What area of student housing do you think AI could impact most?",
    type: "radio",
    options: [
      { value: "maintenance", label: "Maintenance and Repairs" },
      { value: "community", label: "Community Engagement" },
      { value: "resident_support", label: "Resident Support" },
      { value: "operations", label: "Operations" },
      { value: "safety", label: "Safety & Access" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: 13,
    fieldName: "ai_creativity_impact",
    text: "In your opinion, how well does AI understand human needs in this industry?",
    type: "slider",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Poorly" },
      { value: 3, label: "Adequately" },
      { value: 4, label: "Well" },
      { value: 5, label: "Very well" },
    ],
  },

  // Section 4: Creativity, Ethics & Reflection
  {
    id: 14,
    fieldName: "ai_creativity_effect",
    text: "Do you think AI makes creative tasks easier or harder?",
    type: "radio",
    options: [
      { value: "much_easier", label: "Much easier" },
      { value: "slightly_easier", label: "Slightly easier" },
      { value: "no_difference", label: "No difference" },
      { value: "slightly_harder", label: "Slightly harder" },
      { value: "much_harder", label: "Much harder" },
    ],
  },
  {
    id: 15,
    fieldName: "ai_biggest_fear",
    text: "What concerns you most about AI's growth?",
    type: "radio",
    options: [
      { value: "job_loss", label: "Job loss" },
      { value: "bias", label: "Bias" },
      { value: "data_privacy", label: "Data privacy" },
      { value: "dependence", label: "Dependence" },
      { value: "creativity_loss", label: "Creativity loss" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: 16,
    fieldName: "ai_biggest_hope",
    text: "What excites you most about AI's future?",
    type: "radio",
    options: [
      { value: "efficiency", label: "Efficiency" },
      { value: "better_communication", label: "Better communication" },
      { value: "new_jobs", label: "New jobs" },
      { value: "global_solutions", label: "Global solutions" },
      { value: "personal_growth", label: "Personal growth" },
      { value: "other", label: "Other" },
    ],
  },

  // Section 5: Workshop Intent & Follow-up
  {
    id: 17,
    fieldName: "session_interest",
    text: "Would you be interested in an AI training session tailored to your level?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: 18,
    fieldName: "ai_workshop_interest",
    text: "What kind of workshop would interest you most?",
    type: "radio",
    options: [
      { value: "productivity", label: "AI for Productivity" },
      { value: "creativity", label: "AI for Creativity" },
      { value: "managers", label: "AI for Managers" },
      { value: "student_experience", label: "AI in Student Experience" },
      { value: "not_sure", label: "I'm not sure yet" },
    ],
  },

  // Bonus Questions
  {
    id: 19,
    fieldName: "ai_barrier",
    text: "When using AI, what's your biggest challenge?",
    type: "radio",
    options: [
      { value: "accuracy", label: "Accuracy" },
      { value: "complexity", label: "Complexity" },
      { value: "trust", label: "Trust" },
      { value: "lack_of_training", label: "Lack of training" },
      { value: "security_policies", label: "Security policies" },
    ],
  },
  {
    id: 20,
    fieldName: "ai_tool_frequency",
    text: "How often do you experiment with new tools?",
    type: "radio",
    options: [
      { value: "rarely", label: "Rarely" },
      { value: "occasionally", label: "Occasionally" },
      { value: "monthly", label: "Monthly" },
      { value: "weekly", label: "Weekly" },
      { value: "daily", label: "Daily" },
    ],
  },
  {
    id: 21,
    fieldName: "ai_word_future",
    text: "What's one word you associate with the future of AI?",
    type: "text-input",
    required: true,
  },
]

// Archetypes Data
export const archetypes: Record<ArchetypeKey, Archetype> = {
  explorer: {
    name: "Explorer",
    description:
      "As an Explorer, you approach AI with curiosity and openness. You're eager to learn about new technologies and experiment with different applications, but you may still be developing a strategic framework for implementation.",
    strengths: [
      "Openness to new technologies and approaches",
      "Willingness to experiment and learn from failures",
      "Ability to identify novel applications for AI",
    ],
    growthAreas: [
      "Developing a more structured strategic approach",
      "Building deeper technical knowledge",
      "Creating systematic implementation processes",
    ],
    recommendations: [
      "Formalize your learning process with dedicated time for AI education",
      "Connect with peers who are further along in their AI journey",
      "Start documenting your experiments and learnings to build an organizational knowledge base",
    ],
    color: "#00A19A", // Teal color
  },

  strategist: {
    name: "Strategist",
    description:
      "As a Strategist, you excel at integrating AI into your organization's broader goals. You have a clear vision for how AI can transform your business and are methodical in your implementation approach.",
    strengths: [
      "Strong alignment of AI initiatives with business objectives",
      "Ability to prioritize high-impact AI applications",
      "Systematic approach to measuring and scaling successful pilots",
    ],
    growthAreas: [
      "Balancing strategic planning with agility and experimentation",
      "Developing deeper technical understanding",
      "Communicating complex AI concepts to diverse stakeholders",
    ],
    recommendations: [
      "Create cross-functional AI steering committees to broaden perspective",
      "Develop a formal AI governance framework",
      "Establish regular strategic reviews of AI initiatives against business outcomes",
    ],
    color: "#00205B", // Navy color
  },

  innovator: {
    name: "Innovator",
    description:
      "As an Innovator, you push boundaries and seek transformative applications of AI. You're comfortable with risk and focused on creating competitive advantage through cutting-edge technology.",
    strengths: [
      "Forward-thinking approach to AI applications",
      "Comfort with ambiguity and emerging technologies",
      "Ability to envision and create disruptive business models",
    ],
    growthAreas: [
      "Balancing innovation with practical implementation",
      "Building organizational buy-in for transformative changes",
      "Developing frameworks to evaluate novel approaches",
    ],
    recommendations: [
      "Create dedicated innovation spaces where teams can experiment safely",
      "Develop partnerships with research institutions or AI startups",
      "Implement structured processes to move from innovation to implementation",
    ],
    color: "#6CDBD6", // Teal color
  },

  skeptic: {
    name: "Skeptic",
    description:
      "As a Skeptic, you take a cautious, measured approach to AI adoption. You value proven results over hype and ensure thorough evaluation of risks before implementation.",
    strengths: [
      "Thorough risk assessment and mitigation",
      "Focus on proven, practical applications",
      "Strong emphasis on ROI and business case development",
    ],
    growthAreas: [
      "Balancing caution with the need for innovation",
      "Developing more comfort with experimentation",
      "Building a forward-looking AI vision",
    ],
    recommendations: [
      "Start with small, low-risk AI pilots to build confidence",
      "Develop a framework for evaluating AI opportunities that balances risk and reward",
      "Connect with peers who have successfully implemented similar AI solutions",
    ],
    color: "#64748b", // slate-500
  },

  observer: {
    name: "Observer",
    description:
      "As an Observer, you're attentively watching AI developments but haven't fully engaged yet. You're gathering information and insights before determining your approach.",
    strengths: [
      "Thoughtful consideration of AI's implications",
      "Ability to learn from others' successes and failures",
      "Balanced perspective on benefits and challenges",
    ],
    growthAreas: [
      "Moving from observation to action",
      "Gaining hands-on experience with AI tools",
      "Developing a clear AI strategy for your role or organization",
    ],
    recommendations: [
      "Set specific goals for exploring one AI tool or use case",
      "Join communities or forums where you can learn from others' experiences",
      "Create a personal learning plan with measurable milestones",
    ],
    color: "#FFD166", // Yellow color
  },
}

// Sections for the quiz
export const sections = [
  {
    id: 1,
    title: "Getting Started",
    description: "Let's get to know you",
  },
  {
    id: 2,
    title: "Emotional Response",
    description: "Your feelings about AI",
  },
  {
    id: 3,
    title: "AI Usage",
    description: "How you interact with AI",
  },
  {
    id: 4,
    title: "Industry Impact",
    description: "AI in student housing",
  },
  {
    id: 5,
    title: "Reflection",
    description: "Your thoughts on AI's future",
  },
]
