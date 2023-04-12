import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>
        <input
          type="email"
          placeholder="youremail@domain.com"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="**********"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <button>
        Don't have an account? <span className=" font-bold">Register here</span>{" "}
      </button>
    </>
  );
}

export default Login;
