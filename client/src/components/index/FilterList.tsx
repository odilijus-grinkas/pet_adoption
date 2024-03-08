function FilterList() {
  return (
    <>
      <div className="dropdown my-3">
        <a
          className="btn btn-secondary dropdown-toggle w-100"
          href="#"
          role="button"
          id="dropdownMenuLink1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Svoris
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
          <li>
            <a className="dropdown-item" href="#">
              Mažas
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Vidutinis
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Didelis
            </a>
          </li>
        </ul>
      </div>

      <div className="dropdown">
        <a
          className="btn btn-secondary dropdown-toggle w-100"
          href="#"
          role="button"
          id="dropdownMenuLink2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Spalva
        </a>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink2">
          <li>
            <a className="dropdown-item" href="#">
              Juoda
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Balta
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Ruda
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default FilterList;
