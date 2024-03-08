import FilterList from "../components/index/FilterList";
import PetList from "../components/index/PetList";

function Index() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          <FilterList />
        </div>
        <div className="col-10">
          <PetList />
        </div>
      </div>
    </div>
  );
}

export default Index;
