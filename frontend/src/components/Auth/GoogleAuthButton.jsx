import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

const GoogleLoginButton = ({ onGoogleAuth }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const token = tokenResponse.credential || tokenResponse.access_token;
      //TODO: Remove console.log
      console.log("google auth response", tokenResponse);
      onGoogleAuth(token);
    },
    onError: () => {
      console.error("Google Login Failed");
    },
    flow: "implicit", // or 'auth-code' if using OAuth code flow
    scope: "openid email profile",
  });

  return (
    <Button variant="outline" className="w-full" onClick={() => login()}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">Continue with Google</span>
    </Button>
  );
};

export default GoogleLoginButton;

// import { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";

// const GoogleLoginButton = ({ onGoogleLogin }) => {
//   const btnRef = useRef();
//   const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID

//   useEffect(() => {
//     if (window.google && btnRef.current) {
//       window.google.accounts.id.initialize({
//         client_id: clientID,
//         callback: handleResponse,
//       });

//       window.google.accounts.id.renderButton(btnRef.current, {
//         theme: "outline",
//         size: "large",
//       });
//     }
//   }, []);

//   const handleResponse = (response) => {
//     const token = response.credential; // JWT
//     // TODO: Remove console.log
//     console.log("token ", response)
//     onGoogleLogin(token);
//   };

//   return (
//     <Button ref={btnRef} variant="outline" className="w-full">
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//         <path
//           d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
//           fill="currentColor"
//         />
//       </svg>
//       <span className="sr-only">Login with Google</span>
//     </Button>
//   );
// };

// export default GoogleLoginButton;

// TODO: Remove this after backend implementation
// Receive a Google JWT token (response.credential)

// Send it to your backend

// Your backend:

// Verifies the token (OAuth2Client google-auth-library jsonwebtoken)

// Extracts user info (email, name, etc.)

// Checks if the user exists in your DB

// If yes → logs them in

// If not → creates a new user
