import Link from "next/link";

export default function Users({ users }) {
    return (
        <div>
        <h1>All User List</h1>
        <Link href='/register'>Create New User</Link>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {users.data.map((user) => (
                    <li>
                        <h2>{`Name:${user.first_name}${user.last_name}`}</h2>
                        <h3>User Email: {user.email}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let users = await res.json();

  return {
    props: { users },
  };
}
