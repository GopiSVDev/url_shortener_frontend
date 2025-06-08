import AllUrlsPage from "@/components/UrlsPage/AllUrlsPage";
import AnimationWrapper from "@/layouts/AnimationWrapper";

const UrlsPage = () => {
  return (
    <AnimationWrapper>
      <div className="w-full px-6 py-10 flex">
        <AllUrlsPage />
      </div>
    </AnimationWrapper>
  );
};

export default UrlsPage;
