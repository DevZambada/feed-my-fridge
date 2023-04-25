import { SearchIcon } from "../icons";

function SearchBar({ handleQueryChange }) {
  const handleRecipes = (e) => {
    const query = e.target.value;
    handleQueryChange(query);
  };

  return (
    <div className="relative text-gray-600 mt-3">
      <input
        className="w-full h-10 pl-10 pr-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-900"
        type="text"
        id="search"
        placeholder="Search Recipes"
        onChange={handleRecipes}
      />
      <div className="absolute top-0 left-0 inline-flex items-center justify-center w-10 h-full">
        <SearchIcon />
      </div>
    </div>
  );
}

export default SearchBar;
