import { useSelector } from "react-redux"
import MovieGrid from "../Card"
import { IAppState } from "../../store.type"
import { ReactElement, useEffect, useMemo, useRef } from "react"
import useFetch from "../../hooks/useFetch"

const CardsSection = () => {
  const { data, loaders: { fetching }, currentPage, searchText } = useSelector((app: IAppState) => app.Dashboard)
  const scrollableContainer = useRef<any>(null)
  const { fetchData } = useFetch()

  useEffect(() => {
    const handleScroll = async () => {
      const container = scrollableContainer.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;

        if (scrollTop + clientHeight >= scrollHeight - 5 && !fetching) {
          fetchData({ pageNumber: currentPage + 1 });
        }
      }
    }

    const container = scrollableContainer.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [fetching])

  const filteredMovies = useMemo(() => {
    if (!searchText) return data
    return data.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
  }, [searchText, data])

  return (
  <div ref={scrollableContainer} className="h-[85vh] flex justify-between items-start w-full overflow-scroll" data-testid="cards-section">
    <MovieGrid movies={filteredMovies} fetching={fetching} />
  </div>
)}

export default CardsSection