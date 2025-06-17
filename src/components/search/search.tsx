interface ISearchProps {
    searchTerm: string;
    setSearchTerm: any;
}

const Search = ({ searchTerm, setSearchTerm }: ISearchProps) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                    type="text"
                    name="searchTerm"
                    id="searchTerm"
                    placeholder="Search through thousands of movies"
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
    )
}

export default Search