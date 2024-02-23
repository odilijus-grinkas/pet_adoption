import { useState, useEffect } from "react";

export default function Index() {
  // const [data, setData] = useState([]);
  const [data, setData] = useState();

  // function that fetches stuff
  const fetchAndSetData = async () => {
    try {
      // Defaults to using get method on provided link
      const response = await fetch(`http://localhost:3001/api/post/all`);
      // response is a promise object, its ok parameter is a true/false depending if data successfully fetched
      if (response.ok) {
      // Turning response promise into json that contains data property with what we want
        const parsed = await response.json();
      // Set data in useState so it can be rendered in div
        setData(parsed.data);
      } else {
        // response.ok == false? set to nothing
        setData("")
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // run our fetch method to try and setData in it
    fetchAndSetData();
    // re-renders page every time setData changes the data variable in useState.
  },[data]);
  
  return (
    <>
      <h1>Working index page, give me components</h1>
      <div>
        <h3>Fetched Data:</h3>
      {data ? data.map((obj,key) => {
        return <div key={key}>Pet Name: {obj.pet_name} Post Description: {obj.description}</div>
      }): 
      <div>Data failed to fetch, did you start the server?</div>}
      </div>
    </>
  );
}
