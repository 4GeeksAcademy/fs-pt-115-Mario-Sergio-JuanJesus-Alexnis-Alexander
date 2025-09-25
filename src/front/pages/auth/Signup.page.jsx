import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/page/signUp.module.css";

export const SignupPage = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState(null);
  const { authSignUp, loading } = useAuth();
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
      <p className={styles.signin}>
        Already have an acount ?{" "}
        <Link to={"/login"}>
          <span>SignIn</span>{" "}
        </Link>
      </p>
    </form>
  );
};
