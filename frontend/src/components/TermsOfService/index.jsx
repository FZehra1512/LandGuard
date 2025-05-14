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

const TermsOfService = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-balance underline text-primary underline-offset-4 hover:underline">
        Terms of Service
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-primary">Landguard Terms of Service</DialogTitle>
          <DialogDescription className="text-sm text-accent text-center">
            Last updated: April 10, 2025
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 py-6">
            <p className="text-sm text-foreground">
              Welcome to Landguard! By accessing or using our website or any of our services, 
              you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">1. About Landguard</h3>
              <p className="text-sm text-foreground">
                Landguard is a digital platform focused on monitoring urban greenery and supporting reforestation 
                efforts in Karachi. We use satellite data, maps, and community input to promote green spaces and 
                environmental awareness.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">2. User Responsibilities</h3>
              <p className="text-sm text-foreground">By using Landguard, you agree to:</p>
              <ul className="list-disc pl-6 text-sm text-foreground">
                <li>Use the platform for lawful and constructive purposes only.</li>
                <li>Provide accurate information when submitting reports or interacting with the platform.</li>
                <li>Respect community guidelines when participating in discussions or submitting content.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">3. Content & Data</h3>
              <p className="text-sm text-foreground">
                All content shared or submitted by users (e.g., reports, photos, suggestions) remains the property 
                of the user, but you grant Landguard the right to display, use, and share that content for 
                environmental advocacy and platform improvement purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">4. Accuracy of Information</h3>
              <p className="text-sm text-foreground">
                While we strive to provide accurate data (e.g., greenery insights, NDVI analysis), Landguard does 
                not guarantee the completeness or accuracy of all information. Satellite data and user reports may 
                have limitations.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">5. Platform Availability</h3>
              <p className="text-sm text-foreground">
                We may update, modify, or suspend access to Landguard at any time for maintenance, improvement, 
                or other operational reasons.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">6. Limitation of Liability</h3>
              <p className="text-sm text-foreground">
                Landguard is not liable for any direct or indirect damages arising from the use of our platform, 
                including but not limited to decisions made based on our data or reports.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">7. Changes to Terms</h3>
              <p className="text-sm text-foreground">
                We may update these Terms of Service from time to time. The latest version will always be 
                available on this page.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-semibold text-primary ">8. Contact Us</h3>
              <p className="text-sm text-foreground">
                If you have any questions about these Terms, please contact us at:
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

export default TermsOfService
