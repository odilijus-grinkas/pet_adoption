import FilterList from "../components/index/FilterList";
import PetListFiltered from "../components/index/PetListFiltered";

function IndexFiltered() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <FilterList />
        </div>
        <div className="col-10">
          <PetListFiltered />
        </div>
      </div>
    </div>
  );
}

export default IndexFiltered;
