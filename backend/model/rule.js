class RuleModel{   

    /**
     *   @description: Model responsavel pela listagem
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    list(){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            var sql = `
SELECT
    clients.id as client_id,
    clients.name as client_name,
	rules.description,
	rules.id,
	rules.param,
	rules.prefix
FROM rules
INNER JOIN clients ON clients.id = rules.client`

            mysql.exec(sql).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela listagem
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consult(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            var sql = `
SELECT
    clients.id as client_id,
    clients.name as client_name,
	rules.description,
	rules.id,
	rules.param,
	rules.prefix
FROM rules
INNER JOIN clients ON clients.id = rules.client
WHERE rules.id = ?
LIMIT 1`;
            mysql.exec(sql, param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela listagem
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consultOfClient(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            var sql = `SELECT * FROM rules WHERE client = ?`;
            mysql.exec(sql, param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela inserção
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    insert(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('INSERT INTO rules SET ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela alteração
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    update(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('UPDATE rules SET client = ?, description = ?, param = ?, prefix = ? WHERE id = ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    

}
module.exports = new RuleModel();
