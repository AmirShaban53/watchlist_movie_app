import React, { useContext } from "react";
import { MovieContext } from "../App";
const Dropdown = ({ genres, selectedGenre }) => {
  const { selectGenre } = useContext(MovieContext);
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 col-md-2 ">
          <h4 className="">GENRE:</h4>
        </div>
        <div className="col-6 col-md-8">
          <div class="dropdown ">
            <label
              className="btn .dark text-white border dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selectedGenre.name}
            </label>
            <ul
              class="dropdown-menu dark"
              aria-labelledby="dropdownMenuButton1"
            >
              {genres.map((genre) => {
                return (
                  <li
                    className="dropdown-item text-white"
                    type="button"
                    // onClick={selectGenre(genre.id)}
                    onClick={() => {
                      selectGenre(genre.id);
                    }}
                  >
                    {genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
