import React, { useMemo } from "react";
import queryString from "query-string";

import { HeroCard } from "../heroes/HeroCard";
import { useForm } from "../../hooks/useForm";
import { useLocation } from "react-router-dom";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const [{ searchText }, handleInputChange] = useForm({
    searchText: q,
  });

  const heroesFilter = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              name="searchText"
              value={searchText}
              type="text"
              placeholder="Find hero..."
              className="form-control"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-block btn-outline-primary mt-1"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" && <div className="alert alert-info">Search a hero</div>}

          {q !== "" && heroesFilter.length === 0 && (
            <div className="alert alert-danger">
              There is no a hero with {q}
            </div>
          )}

          {heroesFilter.map((hero) => (
            <HeroCard
              key={hero.id}
              {...hero}
              className="animate__animated animate__fadeIn"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
