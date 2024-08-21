import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Home = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/heroImage.png)",
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
          <button className="btn btn-secondary">Trial</button> &ensp;
          <label
            htmlFor="my_modal_7"
            id="LoginButton"
            className="btn btn-primary"
          >
            Login
          </label>
          <input type="checkbox" id="my_modal_7" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <div role="tablist" className="tabs tabs-lifted">
                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab"
                  aria-label="Login"
                  defaultChecked
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  <LoginForm />
                </div>

                <input
                  type="radio"
                  name="my_tabs_2"
                  role="tab"
                  className="tab"
                  aria-label="Register"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  <RegisterForm />
                </div>
              </div>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
