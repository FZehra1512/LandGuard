import { Link } from "react-router-dom";
import logo from "@/assets/images/Landguard_logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Facebook, Instagram, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import TermsOfService from "@/components/TermsOfService";
import Footer from "@/components/Footer";
//TODO: Add inta link
//TODO: Onsubmit integration
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string(), // Honeypot field
});

const ContactPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "", // Honeypot field
    },
  });

  const onSubmit = async (data) => {
    try {
      // Check honeypot field - if filled, silently return
      if (data.website) {
        form.reset();
        return;
      }
      // const payload = {

      // }

      toast({
        variant: "success",
        title: "Success!",
        description: `${data.name} ${data.email} ${data.website}`,
      });

      // toast({
      //   title: "Success!",
      //   description: "Your message has been sent successfully.",
      // });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-svh flex flex-col">
      <nav className="fixed bg-white top-0 left-0 right-0 z-50 w-full py-3 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 sm:w-44" />
        </Link>
      </nav>
      <div className="min-h-svh flex flex-1 flex-col items-center justify-center bg-white pt-6 md:pt-10">
        <div className="w-full py-20 md:py-14 lg:py-8 px-6 sm:px-12 xl:px-32">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <div className="space-y-12 flex flex-col justify-center">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Have Questions?
                </h1>
                <p className="text-lg text-muted-foreground">
                  We're here to help! Send us your questions or concerns using
                  the contact form, and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href="mailto:landguardinfo@gmail.com"
                  className="flex items-center gap-6 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 p-2 rounded-md bg-primary shadow-md flex justify-center items-center hover:bg-primaryDark">
                    <Mail className="w-5 h-5 text-background" />
                  </div>
                  landguardinfo@gmail.com
                </a>
                <a
                  href="https://www.facebook.com/share/19EyeaH4Dc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 p-2 rounded-md bg-primary shadow-md flex justify-center items-center hover:bg-primaryDark">
                    <Facebook className="w-5 h-5 text-background" />
                  </div>
                  Follow us on Facebook
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 p-2 rounded-md bg-primary shadow-md flex justify-center items-center hover:bg-primaryDark">
                    <Instagram className="w-5 h-5 text-background" />
                  </div>
                  Follow us on Instagram
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="xl:p-6 space-y-6">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      {...form.register("name")}
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Honeypot field - hidden from real users */}
                <div className="hidden">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    {...form.register("website")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    {...form.register("subject")}
                  />
                  {form.formState.errors.subject && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={5}
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              <div className="px-8 text-center text-xs text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By sending message, you agree to our <TermsOfService /> and{" "}
                <PrivacyPolicy />.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
