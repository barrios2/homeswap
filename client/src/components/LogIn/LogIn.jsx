import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

const initialFormState = {
  email: "",
  password: "",
};

function LogIn() {
  const { setIsLoggedIn, setUserId, setToken } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/user/login",
    onSuccess,
  );

  useEffect(() => {
    return () => cancelFetch;
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  function onSuccess(userData) {
    setFormData(initialFormState);
    setIsLoggedIn(true);
    setUserId(userData.id);
    setToken(userData.token);

    navigate("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    performFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <section className="log-in" id="log-in">
      <div className="log-in-container">
        <div className="left">
          <div className="login-text">
            <p>
              Discover The <span className="login-text-span">World</span> Just
              From here!
            </p>
          </div>
          <div className="log-in-form">
            <form onSubmit={handleSubmit} /*action="" method="post"*/>
              <div className="password">
                <input
                  type="email"
                  /* name="email"*/
                  className="email-input"
                  placeholder="Email *"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <br />

                <input
                  type={showPassword ? "text" : "password"}
                  /*name="password"*/
                  className="password-input"
                  placeholder="Password *"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
              <div className="submit">
                <button type="submit" className="submit" disabled={isLoading}>
                  Log In
                </button>
                {/* <i className="fa-solid fa-arrow-right"></i> */}
              </div>
            </form>
          </div>
          <div>
            <p className="login-qustion">
              Dont have an account yet?{" "}
              <Link to={"/user/signup"} className="login-qustion-span">
                Sign Up
              </Link>{" "}
            </p>
          </div>
        </div>
        <div className="right">
          <div className="image-grid">
            <img
              src="https://d2oto3d7z6t29c.cloudfront.net/entries/transformed/57/72/564471_bf0bb7c0d5454d40be4c39192d531f5e.jpg"
              alt=""
            />
            <img
              src="https://d3bzyjrsc4233l.cloudfront.net/news/Airbnb_A7WinGK.png"
              alt=""
            />
            <img
              src="https://ascentialcdn.filespin.io/api/v1/storyboard/4e4a6c6652f34ad5a91953297428f0e1/storyboard_000008.jpg?resize=600,600"
              alt=""
            />
            <img
              src="https://www.stashmedia.tv/wp-content/uploads/Screen-Shot-2020-06-30-at-9.58.12-AM-640x360.png"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqoynlEao_OGtwzz3VrtNdFlAdEZYuwL4z9guFzvjiG6x9kmN6VMzju66nf9IAPs1QFsQ&usqp=CAU"
              alt=""
            />
            <img
              src="https://thumbs.dreamstime.com/b/laptop-wooden-desk-art-student-s-airbnb-apartment-sea-view-home-garden-laptop-computer-rests-wooden-desk-art-276124832.jpg"
              alt=""
            />
            <img
              src="https://www.stashmedia.tv/wp-content/uploads/Screen-Shot-2020-06-30-at-10.00.37-AM-640x360.png"
              alt=""
            />
            <img
              src="https://thumbs.dreamstime.com/b/isometric-loft-unit-design-airbnb-apartment-two-story-interior-kitchen-study-living-room-bedroom-276315331.jpg"
              alt=""
            />
            <img
              src="https://mir-s3-cdn-cf.behance.net/projects/404/e011a8126119239.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/378543d6cf516239d9859579ba2046ca6552582d-1062x900.png?w=600&q=95&auto=format"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/59772dc7d53c66db1a123e4e0f6dc003000d74bf-1352x676.png?w=600&q=95&auto=format"
              alt=""
            />
            <img
              src="https://cdn.sanity.io/images/uk7b627p/production/d4fe4923d3e5d1f5a41eea65009f519af510c711-1350x676.png?w=600&q=95&auto=format"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogIn;
