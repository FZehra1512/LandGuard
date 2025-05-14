import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/Landguard_logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import TermsOfService from "@/components/TermsOfService";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "@/components/Auth/GoogleAuthButton";
import { signUpUser } from "@/api/authEndpoints";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

const handleGoogleSignUp = async (googleToken) => {
  // TODO: Call Actual Api for your app token
  // const res = await axios.post("/api/auth/google", { token: googleToken });
  // const appToken = res.data.token;
  toast({
    variant: "success",
    title: "Success",
    description: `Signed up successfully with token: ${googleToken}`,
  });
  // localStorage.setItem("token", appToken); // Or store it in cookies
  // Save it in localStorage or an httpOnly cookie.
};

const SignUpForm = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setIsUser, setUserDetails } = useAuth();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const res = await signUpUser(payload);
      if (res.code === 201) {
        localStorage.setItem("landGuardtoken", res.data.access);
        localStorage.setItem("landGuardRefreshtoken", res.data.refresh);

        // Set authentication state
        setIsUser(true);
        setUserDetails(res.data.user);

        toast({
          variant: "success",
          title: "Success",
          description: "Signed up successfully.",
        });
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else if (res.code === 400) {
        const errorData = res.data;
        if (errorData.email) {
          toast({
            variant: "warning",
            title: "Email Error",
            description: errorData.email,
          });
        } else if (errorData.username) {
          toast({
            variant: "warning",
            title: "Username Error",
            description: errorData.username,
          });
        }
      } else {
        toast({
          variant: "warning",
          title: "Error",
          description: "Failed to Sign Up",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to Sign Up",
      });
    } finally {
      form.reset();
    }
  };

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <div className="p-6 md:px-8 md:py-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-40 sm:w-44" />
            </Link>
            <p className="text-balance text-primary">
              Sign Up below to create your account
            </p>
          </div>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                {...form.register("username")}
              />
              {form.formState.errors.username && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle password visibility</span>
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-white px-2 text-primary">
              Or continue with
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 px-24">
            {/* <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Continue with Apple</span>
            </Button> */}
            <GoogleLoginButton onGoogleAuth={handleGoogleSignUp} />
            {/* <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Continue with Meta</span>
            </Button> */}
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="px-8 text-center text-xs text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By creating an account, you agree to our <TermsOfService /> and{" "}
        <PrivacyPolicy />.
      </div>
    </div>
  );
};

export default SignUpForm;
