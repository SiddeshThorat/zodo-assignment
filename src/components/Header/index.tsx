import { useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setData, setSearchText } from "../../reducers/dashboardReducer/action";
import { IAppState } from "../../store.type";
import { useDebounce } from "./useDebounce";

const Header = () => {
  const dispatch = useDispatch()
  const handleSubmit = (query: string) => {
    dispatch(setSearchText({ searchText: query }))
  }

  return (
  <div className="flex justify-end items-center w-full h-[7vh]" data-testid="header">
    <SearchInput onSearch={handleSubmit} />
  </div>
)}

interface SearchInputProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search...', onSearch }) => {
  const [query, setQuery] = useState('');
  const debounceText = useDebounce(query, 500)
  const isInitialRender = useRef<boolean>(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!isInitialRender.current) {
      onSearch(debounceText)
      return
    }
    isInitialRender.current = false
  }, [debounceText])

  return (
    <div className="flex items-center shadow-sm p-2 w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-grow p-2 outline-none text-base rounded-2xl text-black"
      />
    </div>
  );
};

export default Header