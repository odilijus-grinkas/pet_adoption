import React, { useEffect, useState } from "react";

const TokenDisplay: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

 

  return (
    <div>
      <h2>Token Display</h2>
      {token ? (
        <div>
          <p>Token: {token}</p>
          {userData && (
            <div>
              <h3>User Data</h3>
              <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>No token found. Please login first.</p>
      )}
    </div>
  );
};

export default TokenDisplay;
