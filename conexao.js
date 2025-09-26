import { createConnection } from 'mysql2'; 

const connection = createConnection ({ 
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'banco_animosidade', 
}); 

 connection.connect ((err) => { 
  if (err) throw err; 
  console.log ('Connected to MySQL database'); 
});

export default connection 