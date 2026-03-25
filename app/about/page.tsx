"use client"

import { Header } from "@/components/header"
import { EthiopianCross } from "@/components/ethiopian-cross"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto max-w-2xl py-6 px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <EthiopianCross size="lg" className="text-primary/80" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              About Mezmure Dawit
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Daily Psalm Reading Companion
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* What is this app */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              What is Mezmure Dawit?
            </h2>
            <p className="mb-4 text-muted-foreground">
              Mezmure Dawit (መዝሙረ ዳዊት) is a daily psalm reading application inspired by the rich traditions of the Ethiopian Orthodox Church. The name means "Psalms of David" in Amharic, honoring the timeless wisdom found in the Book of Psalms.
            </p>
            <p className="text-muted-foreground">
              This app provides a structured weekly schedule of psalm readings, allowing you to engage with these sacred texts in a meaningful and consistent way. Whether you're seeking spiritual nourishment, meditation, or simply a moment of reflection, Mezmure Dawit is here to guide your daily practice.
            </p>
          </section>

          {/* Features */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Key Features
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span><strong>Daily Schedule:</strong> A carefully curated weekly reading plan that guides you through the Psalms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span><strong>Reading Streak:</strong> Track your consistency and build a habit of daily reflection</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span><strong>Progress Tracking:</strong> Mark chapters as read and monitor your spiritual journey</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span><strong>Dark Mode Support:</strong> Comfortable reading experience in any lighting condition</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <span><strong>Offline Access:</strong> Your progress is saved locally on your device</span>
              </li>
            </ul>
          </section>

          {/* Inspiration */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              Our Inspiration
            </h2>
            <p className="mb-4 text-muted-foreground">
              The Ethiopian Orthodox Church has a rich tradition of psalm singing and recitation. The Psalms are central to daily worship, prayer, and spiritual practice. This app seeks to make this beautiful tradition more accessible to everyone, regardless of their background or location.
            </p>
            <p className="text-muted-foreground">
              By providing a structured reading schedule, we hope to help you develop a deeper connection with these ancient texts and their timeless wisdom.
            </p>
          </section>

          {/* How to Use */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              How to Use
            </h2>
            <ol className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">1.</span>
                <span>Visit the home page to see today's psalm reading schedule</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">2.</span>
                <span>Read the assigned psalms at your own pace</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">3.</span>
                <span>Mark chapters as read to track your progress</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">4.</span>
                <span>Build your reading streak by returning daily</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">5.</span>
                <span>Use the day selector to view readings for other days of the week</span>
              </li>
            </ol>
          </section>

          {/* Spiritual Practice */}
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              A Practice of Reflection
            </h2>
            <p className="mb-4 text-muted-foreground">
              The Psalms are more than just ancient texts—they are expressions of the human experience: joy, sorrow, hope, and faith. Each psalm offers wisdom and comfort for our modern lives.
            </p>
            <p className="text-muted-foreground">
              We encourage you to take time with each reading, reflect on its meaning, and consider how it speaks to your own spiritual journey. Whether you read them aloud, meditate on them silently, or study them deeply, may they bring you peace and inspiration.
            </p>
          </section>

          {/* Footer Message */}
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="mb-2 text-lg font-semibold text-foreground">
             ስብሐት ለእግዚአብሔር ወለወላዲቱ ድንግል ወለመስቀሉ ክቡር አሜን!

            </p>
            
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link href="/">
            <Button size="lg">Start Reading Today</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
