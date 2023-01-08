
export default function Movies({ movies }) {
    return (
        <div>
            <h1>Top 5 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/movies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let movies = await res.json();

  return {
    props: { movies },
  };
}
