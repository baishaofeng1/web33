const mysql = require("mysql");

const clinet = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"itbaizhan_ego"
})

function sqlFn(sql,arr,callback){
    clinet.query(sql,arr,(error,result) =>{
        if(error){
            console.log(error);
            return;
        }
        callback(result)
    })
}

module.exports = sqlFn