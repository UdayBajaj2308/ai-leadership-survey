import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AI Leadership Sentiment Explorer",
  description: "Discover your AI leadership archetype and sentiment profile",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3H0VLL2WZK" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3H0VLL2WZK');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} font-poppins`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>

        {/* Hidden form for Google Apps Script submission */}
        <form
          id="hiddenForm"
          method="POST"
          action="https://script.google.com/macros/s/AKfycbxOQ0S5UAeRAGsaNAr4cVYULG6kle4wsaUyAzKs7_jKrifs8YH-_Z9qKxrrF4-DxJE5Qw/exec"
          target="invisibleFrame"
        >
          <input type="hidden" name="participant_name" />
          <input type="hidden" name="archetype" />
          <input type="hidden" name="ai_primary_emotion" />
          <input type="hidden" name="ai_sentiment_student_housing" />
          <input type="hidden" name="ai_tools" />
          <input type="hidden" name="ai_creativity_impact" />
          <input type="hidden" name="ai_confidence" />
          <input type="hidden" name="ai_metaphor" />
          <input type="hidden" name="ai_biggest_hope" />
          <input type="hidden" name="ai_workshop_interest" />
          <input type="hidden" name="ai_familiarity" />
          <input type="hidden" name="ai_use_case" />
          <input type="hidden" name="learning_style" />
          <input type="hidden" name="session_interest" />
          <input type="hidden" name="ai_word_future" />
          <input type="hidden" name="ai_future_outlook" />
          <input type="hidden" name="ai_trust_score" />
          <input type="hidden" name="ai_creativity_effect" />
          <input type="hidden" name="ai_biggest_fear" />
          <input type="hidden" name="ai_barrier" />
          <input type="hidden" name="ai_tool_frequency" />
          <input type="hidden" name="timestamp" />
        </form>
        <iframe name="invisibleFrame" style={{ display: "none" }}></iframe>
      </body>
    </html>
  )
}
