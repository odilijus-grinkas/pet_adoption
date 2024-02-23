interface DatabaseConfig {
  connectionLimit: number;
  waitForConnections: boolean;
  host: string;
  user: string;
  password: string;
  database: string;
}

let {
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DATABASE: DB,
} = process.env;

if (!HOST) {
  HOST = "localhost";
  USER = "root";
  PASSWORD = "root";
  DB = "pet_adoption"
};

if (!HOST || !USER || !PASSWORD || !DB) {
  throw new Error("Incomplete database configuration provided.");
}

const dbConfig: DatabaseConfig = {
  connectionLimit: 50,
  waitForConnections: true,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
};
