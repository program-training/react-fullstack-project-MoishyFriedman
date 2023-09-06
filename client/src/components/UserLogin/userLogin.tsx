import { useContext, useState } from "react";
import "../style.css";
import { visibilityContext } from "../../context/visibilityContext";

interface User {
  email: string;
  password: string;
}

async function handlerSubmit(user: User) {
  try {
    const data = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!data) throw new Error(`data can't found`);
    const response = await data.json();
    localStorage.setItem("token", JSON.stringify(response.responseObj.token));
  } catch (error) {
    console.log(error);
  }
}

export default function UserLogin(): JSX.Element | null {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const context = useContext(visibilityContext);
  if (!context) return null;
  const { visibility, setVisibility } = context;

  return (
    <div className={visibility.userLogin}>
      <nav>
        <button
          onClick={() =>
            setVisibility({
              ...visibility,
              userLogin: "invisible",
              home: "visible",
            })
          }
        >
          Home page
        </button>
      </nav>
      <form
        className="card h-100 "
        onSubmit={(event) => {
          event.preventDefault();
          handlerSubmit(user);
        }}
      >
        <label className="form-label">
          email:
          <input
            type="text"
            id="form3Example2"
            className="form-control"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
        </label>
        <label className="form-label">
          password:
          <input
            type="text"
            id="form3Example2"
            className="form-control"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
        </label>
        <button>login</button>
      </form>
    </div>
  );
}
