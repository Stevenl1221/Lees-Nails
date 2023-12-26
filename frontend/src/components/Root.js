import { useState } from "react";
import "../App.css";
function UserCard({ user }) {
  return (
    <div className="card">
      <h3 className="card-title">{user.name}</h3>
    </div>
  );
}

function Root() {
  const [userList, setUserList] = useState([
    {
      name: "Steven",
    },
    {
      name: "John",
    },
    {
      name: "Gary",
    },
    {
      name: "Tom",
    },
  ]);

  return (
    <div className="App" >
      <div className="card-container" style={{marginTop: 100}}>
        {userList.map((user) => (
          <UserCard key={user.name} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Root;
