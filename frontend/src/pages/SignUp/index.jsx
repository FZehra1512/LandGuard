
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          // src="https://img.freepik.com/free-photo/aerial-view-central-park-manhattan-new-york-city-surrounded-by-skyscrapers_181624-52364.jpg"
          src="https://cdn.sanity.io/images/oyzyxja8/v2/434ded3382c9be18fff829f3fe76e14b1bb462ca-2000x1333.jpg?w=2048&q=90&auto=format"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
