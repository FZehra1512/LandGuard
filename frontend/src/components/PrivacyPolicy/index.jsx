import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const PrivacyPolicy = () => {
  return (
    <Dialog className="w-[90%]">
      <DialogTrigger className="text-balance underline text-primary underline-offset-4 hover:underline">
        Privacy Policy
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">Landguard Privacy Policy</DialogTitle>
          <DialogDescription className="text-sm text-accent text-center">
            Last updated: April 10, 2025
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 py-6">
            <p className="text-sm text-foreground">
              Your privacy matters to us. This Privacy Policy explains how Landguard collects, uses, and protects your information.
            </p>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">1. What We Collect</h3>
              <p className="text-sm text-foreground">When you use Landguard, we may collect:</p>
              <ul className="list-disc pl-6 text-sm text-foreground">
                <li>Basic personal information (name, email) if you register or submit a report.</li>
                <li>Location data (if you choose to share it) for mapping reports or suggesting plantation sites.</li>
                <li>Device information (IP address, browser type) for analytics and security.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">2. How We Use Your Data</h3>
              <p className="text-sm text-foreground">We use your data to:</p>
              <ul className="list-disc pl-6 text-sm text-foreground">
                <li>Improve the platform's features and functionality.</li>
                <li>Display user-generated content (like plantation reports or suggestions).</li>
                <li>Analyze greenery patterns and community participation.</li>
                <li>Communicate with you (if you subscribe or contact us).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">3. Data Sharing</h3>
              <p className="text-sm text-foreground">
                We do not sell your personal data.
              </p>
              <p className="text-sm text-foreground">We may share aggregated, non-identifiable data with:</p>
              <ul className="list-disc pl-6 text-sm text-foreground">
                <li>Environmental partners.</li>
                <li>Government bodies (only if legally required).</li>
                <li>Researchers or organizations promoting sustainability.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">4. Cookies</h3>
              <p className="text-sm text-foreground">
                We use cookies to enhance user experience, analyze usage patterns, and improve our services. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">5. Data Security</h3>
              <p className="text-sm text-foreground">
                We take reasonable measures to protect your data. However, no online platform can guarantee absolute security.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">6. Your Rights</h3>
              <p className="text-sm text-foreground">You have the right to:</p>
              <ul className="list-disc pl-6 text-sm text-foreground">
                <li>Access your data.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Opt-out of certain data collection features.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">7. Changes to This Policy</h3>
              <p className="text-sm text-foreground">
                We may update this Privacy Policy occasionally. The latest version will always be posted here.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">8. Contact Us</h3>
              <p className="text-sm text-foreground">
                For any privacy-related concerns, contact:
                <br />
                <a
                  href="mailto:landguardinfo@gmail.com"
                  className="text-primary hover:underline"
                >
                  landguardinfo@gmail.com
                </a>
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default PrivacyPolicy
