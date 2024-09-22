import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import TabComponent from "../components/TabComponent";

const Home = () => {
  const tabs = ["Login", "Register"];

  const [activeIndex, setActiveIndex] = useState(tabs[0]);
  const handleTabChange = (tab) => {
    setActiveIndex(tab);
  };
  return (
    <div
      className="h-full hero"
      style={{
        backgroundImage: "url(/heroImage.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome there</h1>
          <p className="mb-5">
            {" "}
            Discover a world of possibilities with our platform.
          </p>

          <TabComponent
            tabs={tabs}
            activeTab={activeIndex}
            onTabChange={handleTabChange}
          />

          <div className="p-4">
            {activeIndex === "Login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
