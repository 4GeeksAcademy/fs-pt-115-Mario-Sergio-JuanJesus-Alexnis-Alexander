import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/page/signUp.module.css";

export const SignupPage = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const { authSignUp, loading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault(e);

    if (input.password != input.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    } else {
      setError(null);
    }

    const newUserData = await authSignUp(
      input.username,
      input.email,
      input.password
    );

    if (newUserData.success) {
      return navigate("/");
    } else {
      setError(newUserData.error || "Error signUp");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const infoNewUser = { ...input, [name]: value };
    setInput(infoNewUser);
  };

  if (loading) {
    return (
      <div className="position-relative" style={{ height: "100vh" }}>
        <div className="position-absolute top-50 start-50 translate-middle fs-2">
          ⌛⌛⌛⌛....Loading....⌛⌛⌛⌛
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleOnSubmit} className={`${styles.form} mx-auto mt-5`}>
      <p className={styles.title}>Register </p>
      <p className={styles.message}>
        Signup now and get full access to our app.{" "}
      </p>
      <label>
        <input
          required
          placeholder=""
          type="username"
          className={styles.input}
          name="username"
          onChange={(e) => handleOnChange(e)}
        />
        <span>Username</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="email"
          className={styles.input}
          name="email"
          onChange={(e) => handleOnChange(e)}
        />
        <span>Email</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
          name="password"
          onChange={(e) => handleOnChange(e)}
        />
        <span>Password</span>
      </label>
      <label>
        <input
          required
          placeholder=""
          type="password"
          className={styles.input}
          name="confirmPassword"
          onChange={(e) => handleOnChange(e)}
        />
        <span>Confirm password</span>
      </label>
      <button className={styles.submit}>Submit</button>
      <div className={styles.googleLoginButton}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth={0}
          version="1.1"
          x="0px"
          y="0px"
          className="google-icon"
          viewBox="0 0 48 48"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        <span onClick={loginWithGoogle}>Log in with Google</span>
      </div>
      <p className={styles.signin}>
        Already have an acount ?{" "}
        <Link to={"/login"}>
          <span>SignIn</span>{" "}
        </Link>
      </p>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </form>
  );
};
