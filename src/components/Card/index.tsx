import Spinner from "../Spinner";

interface MovieCardProps {
  title: string
  imageUrl: string
}

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden m-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
  );
};

interface MovieGridProps {
  movies: { title: string; imageUrl: string }[]
  fetching: boolean
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, fetching }) => {
  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex flex-wrap justify-center w-[100%]">
        {movies.map((movie, index) => (
          <MovieCard key={index} title={movie.title} imageUrl={movie.imageUrl} />
        ))}
      </div>
      <div className="flex flex-wrap justify-center w-[100%]">{fetching && <Spinner />}</div>
    </div>
  );
};

export default MovieGrid