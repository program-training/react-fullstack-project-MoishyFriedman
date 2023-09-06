import { useContext, useState } from "react";
import "../style.css";
import { visibilityContext } from "../../context/context";

interface User {
  email: string;
  password: string;
}

async function handlerSubmit(user: User) {
  try {
    const data = await fetch("http://localhost:3000/api/auth/login", {
      method: "post",
      headers: {
        authorization: "test-token",
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!data) throw new Error(`data can't found`);
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handlerSubmit(user);
        }}
      >
        <label>
          email:
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
        </label>
        <label>
          password:
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          ></input>
        </label>
        <button>login</button>
      </form>
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
    </div>
  );
}
