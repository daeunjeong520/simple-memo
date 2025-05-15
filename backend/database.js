require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASS,
     connectionLimit: 5,
     database: process.env.DB_NAME,
     port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

module.exports = {
    async run(query, params) {
        return new Promise((resolve)=> {
            pool.getConnection()
            .then(conn => {
                conn.query(query, params)
                    .then((rows) => {
                        resolve(rows);
                    })
                    .then((res) => {
                        console.log(res);
                        conn.end();
                        //pool.end();
                    })
                    .catch(err => {
                        console.log(err); 
                        conn.end();
                        //pool.end();
                    })
                }).catch(err => {
                    //pool.end();
                });
        }) 
    }
}