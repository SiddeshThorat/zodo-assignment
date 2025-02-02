import { useDispatch, useSelector } from "react-redux";
import { setData, setLoaders } from "../reducers/dashboardReducer/action";
import { IAppState } from "../store.type";

const useFetch = () => {
  const dispatch = useDispatch()
  const fetchData = async ({ pageNumber }: { pageNumber: number }) => {
    dispatch(setLoaders({ loadername: 'fetching', status: true }))
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d7c76c1536cf4b23cebb4b4ce0291e76&page=${pageNumber}`); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      // setTimeout is not required, added only to show loader implementation
      setTimeout(() => {
        dispatch(setData({
          data: responseData.results.map((movie: any) => {
            return {
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          }
          }),
          currentPage: 1,
          totalPages: responseData.total_pages 
        }))
      }, 5000)
    } catch (error) {
      dispatch(setLoaders({ loadername: 'fetching', status: false }))
    }
  };

  return {
    fetchData
  }
}

export default useFetch