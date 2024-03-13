import FilterSelector from "../components/Posts/FilterComponents/FilterSelector";
import DeinoroFooter from "../components/auth/header/DeinoroFooter";
import DeinoroHeader from "../components/auth/header/DeinoroHeader";
import FilterList from "../components/index/FilterList";
import PetList from "../components/index/PetList";

function Index() {
  return (
    <>
      <DeinoroHeader />
      <div className="container">
        <div className="row">
          <div className="col-2">
            {/* <FilterList /> */}
            <FilterSelector inputLabel="Rūšis" datalist={["Arklys", "Šuo", "Katė"]} setSelection={()=>{}}/>
            <FilterSelector inputLabel="Dydis" datalist={["Mažas", "Vidutinis", "Didelis"]} setSelection={()=>{}}/>
            <FilterSelector inputLabel="Amžius" datalist={["Jaunas (iki 1 metu)", "Suauges", "Senas (>10metu)"]} setSelection={()=>{}}/>
          </div>
          <div className="col-10">
            <PetList />
          </div>
        </div>
      </div>
      <DeinoroFooter />
    </>
  );
}

export default Index;
