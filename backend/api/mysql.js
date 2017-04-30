class mysqlApi{
    /**
     *   @description: Api responsavel pelas execuções realizadas no banco de dados
     *   @param: query, param
     *   @return: Retorna o resultado do banco para a promisse
     */
    exec(query, param){

        if(param == undefined){
            param = [];
        }

        return new Promise(function(resolve, reject){
            var config = require('../enum/config');
            var mysql = require('mysql');

            var connection = mysql.createPool({
                host     : config.mysqlDb.host,
                user     : config.mysqlDb.user,
                password : config.mysqlDb.password,
                database : config.mysqlDb.database,
                debug    : config.mysqlDb.debug
            });

            connection.query(query, param, function (error, results, fields) {

                if (error) {
                    return reject(error)
                }
                return resolve(results)
            });
        })
    }

}
module.exports = new mysqlApi();
