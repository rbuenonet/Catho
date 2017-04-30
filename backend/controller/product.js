class ProductController{
    constructor(){
        this.productModel = require('../model/product');
    }

    /**
    *   @description: Controller responsavel pela listagem
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    list(req, res, next){
        var that = this;

        that.productModel.list().then((data) => {
            if(data.length == 0){
                res.json({ message: 'Nenhum produto encontrado', erro: [], retorno: data });
            }else{
                res.json({ message: 'Listagem de produtos', erro: [], retorno: data });
            }
            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar a listagem de produtos', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela consulta
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    consult(req, res, next){
        var that = this;

        var param = {
            id: req.params.id
        }

        that.productModel.consult(param.id).then((data) => {
            if(data.length == 0){
                res.json({ message: 'Produto não encontrado', erro: [], retorno: data });    
            }else{
                res.json({ message: 'Produto encontrado', erro: [], retorno: data[0] });
            }

            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar as informações do produto', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela inserção
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    insert(req, res, next){

        var that = this;
        var erro = this.validation(req.params, 'I')        

        if(erro){
            res.json({ message: 'Ocorreu um erro ao inserir o produto', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = {
            name: req.params.name,
            price: req.params.price
        }

        that.productModel.insert(param).then((data) => {
            that.productModel.consult([data.insertId]).then((data) => {
                res.json({ message: 'Produto cadastrado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do produto', erro: data, retorno: [] });
                next();
                return;
            })
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao inserir o produto', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela alteraçao
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    update(req, res, next){

        var that = this;
        var erro = this.validation(req.params, 'U')        

        if(erro){
            res.json({ message: 'Ocorreu um erro na alteração do produto', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = [
            req.params.name,
            req.params.price,
            req.params.id
        ]

        that.productModel.update(param).then((data) => {
            if(data.affectedRows > 0){
                that.productModel.consult([req.params.id]).then((data) => {
                    res.json({ message: 'Produto alterado com sucesso', erro: [], retorno: data });
                    next();
                    return;
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as informações do produto', erro: data, retorno: [] });
                    next();
                    return;
                })
            }else{
                res.json({ message: 'Nenhum produto alterado', erro: [], retorno: [] });
                next();
                return;
            }
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro na alteração do produto', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela validação
    *   @param: campos
    *   @return: false or error
    */
    validation(fields, action){
        var erro = [];

        if(!fields.name){
            erro.push('Nome inválido')
        }

        if(!fields.price && /[^0-9\.]/.test(fields.price) && fields.price != 0){
            erro.push('Valor inválido')
        }

        if((!fields.id || /[^0-9\.]/.test(fields.price)) && action != 'I'){
            erro.push('Código inválido')
        }

        if(erro.length > 0){
            return erro;
        }

        return false;
    }
}
module.exports = new ProductController();
