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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
