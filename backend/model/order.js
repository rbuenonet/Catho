class ClientModel{   

    /**
     *   @description: Model responsavel pela consulta
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consult(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM client_order WHERE id = ? LIMIT 1', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }
    /**
     *   @description: Model responsavel pela consulta de todos os produtos por pedido
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consultProductOrder(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            var  sql = `
SELECT 
    products.price AS product_price,
    products.name AS product_name,
    order_products.* 
FROM order_products 
INNER JOIN products ON order_products.product = products.id
WHERE order_products.order = ?  
ORDER BY order_products.id`

            mysql.exec(sql, param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    /**
     *   @description: Model responsavel pela consulta de produto filtrando pedido e produto
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    consultProduct(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM order_products WHERE `order` = ? AND product = ? ORDER BY id', param).then((data) => {
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

            mysql.exec('INSERT INTO client_order SET ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }


    /**
     *   @description: Model responsavel pela inserção de produto
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    insertProduct(param){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('INSERT INTO order_products SET ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }


    /**
     *   @description: Model responsavel pela alteração de produto
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    updateProduct(param, ids){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            var sql = 'UPDATE order_products SET ? WHERE id IN (' + ids + ')'

            mysql.exec(sql, param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }
   

}
module.exports = new ClientModel();
