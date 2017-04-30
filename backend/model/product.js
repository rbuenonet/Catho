class ProductModel{   

    /**
     *   @description: Model responsavel pela listagem
     *   @param: param: object formado no controller
     *   @return: Retorna o resultado do banco para a promisse
     */
    list(){
        return new Promise(function(resolve, reject){
            var mysql = require('../api/mysql');

            mysql.exec('SELECT * FROM products').then((data) => {
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

            mysql.exec('SELECT * FROM products WHERE id = ? LIMIT 1', param).then((data) => {
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

            mysql.exec('INSERT INTO products SET ?', param).then((data) => {
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

            mysql.exec('UPDATE products SET name = ?, price = ? WHERE id = ?', param).then((data) => {
                resolve(data)
            }).catch((data) => {
                reject(data)
            })
        })
    }

    

}
module.exports = new ProductModel();
