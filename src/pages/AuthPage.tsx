import AuthTabs from "@/components/Auth/AuthTabs";
import AnimationWrapper from "@/layouts/AnimationWrapper";

const AuthPage = () => {
  return (
    <AnimationWrapper>
      <div className="flex justify-center items-center min-h-[70vh] my-10">
        <AuthTabs />
      </div>
    </AnimationWrapper>
  );
};

export default AuthPage;
