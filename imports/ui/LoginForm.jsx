import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const LoginForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitRegister = (e) => {
    e.preventDefault();

    Meteor.call(
      "registerAccountWithPassword",
      username,
      email,
      password,
      function (error, result) {
        if (error) {
          alert(error);
        } else {
          console.log(result);
          Meteor.loginWithPassword(username, password);
        }
      }
    );
  };

  const submitLogin = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  const loginForm = (
    <form onSubmit={submitLogin} className="login-form">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>

      <div>
        Don't have and account?{" "}
        <a href="#" onClick={() => setShowLoginForm(false)}>
          Register Here
        </a>
      </div>
    </form>
  );

  const registerForm = (
    <form onSubmit={submitRegister} className="login-form">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Your Email </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>

      <div>
        Already have an account?{" "}
        <a href="#" onClick={() => setShowLoginForm(true)}>
          Login Here
        </a>
      </div>
    </form>
  );

  return showLoginForm ? loginForm : registerForm;
};
