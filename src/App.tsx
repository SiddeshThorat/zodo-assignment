import './App.css';
import Header from './components/Header';
import MovieStats from './components/MovieStats';
import CardsSection from './components/CardsSection';
import useFetch from './hooks/useFetch';
import { useEffect } from 'react';

function App() {
  const { fetchData } = useFetch()

  useEffect(() => {
    fetchData({ pageNumber: 1 })
  }, [])

  return (
    <div className="App">
      <div className="App-header p-7 pt-0 pb-0">
        <Header />
        <MovieStats />
        <CardsSection />
      </div>
    </div>
  );
}

export default App;
