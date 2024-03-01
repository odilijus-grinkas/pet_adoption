import { useEffect, useState } from "react";

export default function Index() {
  // const [data, setData] = useState([]);
  const [data, setData] = useState();
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({});
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
        setData("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((old) => {
      return { ...old, [name]: value };
    });
    console.log(formData);
  };
  // this function is used when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const parsedResponse = await response.json();
      setUserData(parsedResponse);
      console.log(parsedResponse);
    }
  };
  useEffect(() => {
    // run our fetch method to try and setData in it
    fetchAndSetData();
    // re-renders page every time setData changes the data variable in useState.
  }, []);

  return (
    <>
      <h1>Working index page, give me components</h1>
      <div>
        <h3>Fetched Data:</h3>
        {data ? (
          data.map((obj, key) => {
            return (
              <div key={key}>
                Pet Name: {obj.pet_name} Post Description: {obj.description}
              </div>
            );
          })
        ) : (
          <div>Data failed to fetch, did you start the server?</div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          name="username"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          name="password"
          type="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input type="submit" />
      </form>
      {userData
        ? Object.keys(userData).map((key, index) => (
            <div key={index}>{key}: {userData[key]}</div>
          ))
        : null}
    </>
  );
}
