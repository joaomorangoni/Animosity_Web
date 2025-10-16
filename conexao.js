import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banco_animosidade'
});




export default connection;
