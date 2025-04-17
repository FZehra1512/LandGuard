
import SignUpForm from "@/components/SignUpForm";

const SignUp = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-photo/aerial-view-central-park-manhattan-new-york-city-surrounded-by-skyscrapers_181624-52364.jpg?t=st=1744309080~exp=1744312680~hmac=83b30697371322bb5b98c8ff1cb186376df604449a717245f61b890cb398448f&w=1380"
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
