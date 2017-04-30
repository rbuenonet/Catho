class OrderController{
    constructor(){
        this.clientModel = require('../model/client');
        this.orderModel = require('../model/order');
        this.productModel = require('../model/product');
        this.ruleModel = require('../model/rule');
    }

    /**
    *   @description: Controller responsavel pela consulta
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    consult(req, res, next){
        var that = this;

        var param = [
            req.params.id
        ]

        that.clientModel.consult(param).then((data) => {
            if(data.length == 0){
                res.json({ message: 'Pedido não encontrado', erro: [{message: 'Pedido não encontrado'}], retorno: [] });    
            }else{
                res.json({ message: 'Pedido encontrado', erro: [], retorno: data[0] });
            }

            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar as informações do pedido', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela inserção
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    add(req, res, next){

        var that = this;
        var erro = this._validation(req.params)        

        if(erro){
            res.json({ message: 'Ocorreu um erro ao inserir o pedido', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = {
            client: req.params.client,
            product: req.params.product,
            order: req.params.order
        }

        that._controlOrder(param).then((orderId) => {
            var paramConsultProduct = [param.product]
            that.productModel.consult(paramConsultProduct).then((product) => {
                if(product.length > 0){
                    var param = {
                        client: req.params.client,
                        order : orderId,
                        product : product[0].id,
                        price : product[0].price,
                        reason : '',
                        objProduto : product
                    }

                    that._controlProductWithRules(param).then((retorno) => {
                        var paramInsertProduct = {
                            product: retorno.product,
                            price : retorno.price,
                            reason : retorno.reason,
                            order : retorno.order
                        }
                        that.orderModel.insertProduct(paramInsertProduct).then((retorno) => {
                            that.orderModel.consultProductOrder([param.order]).then((retorno) => {
                                var retornoWS = {
                                    products : retorno,
                                    order : param.order
                                }
                                res.json({ message: 'Produto cadastrado com sucesso', erro: [], retorno: retornoWS });
                                next();
                                return;
                            })
                        }).catch((data) => {
                            res.json({ message: 'Ocorreu um erro ao inserir o produto', erro: data, retorno: [] });
                            next();
                            return;
                        })
                    })
                }else{
                    res.json({ message: 'Ocorreu um erro ao identificar o produto do pedido', erro: ['Código do produto inválido'], retorno: [] });
                    next();
                    return;
                }
            })
        })
    }   

    /**
    *   @description: Função responsavel por aplicar regras do cliente
    *   @param: param = {order: int}
    *   @return: orderId
    */
    _controlProductWithRules(param){

        var that = this;
        return new Promise(function(resolve, reject){
            var paramConsultRules = [param.client]
            that.ruleModel.consultOfClient(paramConsultRules).then((retorno) => {
                if(retorno.length > 0){
                    retorno.forEach(function(element) {
                        element.param = JSON.parse(element.param)
//regra DISCOUNT
                        if(element.prefix == 'DISCOUNT'){
                            if(param.product == element.param.product){
                                param.price = element.param.value;
                                param.reason = element.prefix;

                                resolve(param);
                            }else{
                                resolve(param);
                            }
                        }
//regra QUANTITY_DISCOUNT
                        else if(element.prefix == 'QUANTITY_DISCOUNT'){
                            if(param.product == element.param.product){
                                var paramConsultProduct = [param.order, param.product]
                                that.orderModel.consultProduct(paramConsultProduct).then((retorno) => { //retorna os produtos para verificar quantos produtos da promoção ja tem no pedido
                                    var totalProducts = retorno.length + 1; //somado mais um para contar o produto atual
                                    if(totalProducts >= element.param.amount){
                                        param.price = element.param.value;
                                        param.reason = element.prefix;

                                        var list_id = [];
                                        retorno.forEach(function(product){ //altera todos os anteriores
                                            list_id.push(product.id)
                                        })
                                        var paramUpdateProduct = {
                                            price: element.param.value,
                                            reason: element.prefix,
                                        }
                                        that.orderModel.updateProduct(paramUpdateProduct, list_id.join(', ')).then( (retorno) => {
                                            resolve(param);
                                        });                                            
                                    }else{
                                        resolve(param);
                                    }
                                })
                            }else{
                                resolve(param);
                            }
                        }
//regra TAKE_MORE_PAY_LESS
                        else if(element.prefix == 'TAKE_MORE_PAY_LESS'){
                            if(param.product == element.param.product){
                                var paramConsultProduct = [param.order, param.product]
                                that.orderModel.consultProduct(paramConsultProduct).then((retorno) => { //retorna os produtos para verificar quantos produtos da promoção ja tem no pedido
                                    var totalProducts = retorno.length + 1; //somado mais um para contar o produto atual

                                    if(totalProducts%element.param.take == 0){
                                        param.price = 0;
                                        param.reason = element.prefix;

                                        if(element.param.free > 1){ //se a quantidade de produtos para levar for maior que 1, altera os produtos anteriores
                                            retorno.reverse();
                                            var qtd = element.param.free - 1;
                                            var list_id = [];
                                            for (var i = 0; i < qtd; i++) {
                                                list_id.push(retorno[i].id)                                                       
                                            }
                                            var paramUpdateProduct = {
                                                price: 0,
                                                reason: element.prefix,
                                            }
                                            that.orderModel.updateProduct(paramUpdateProduct, list_id.join(', ')).then( (retorno) => {
                                                resolve(param);
                                            });  
                                        }else{
                                            resolve(param);
                                        }
                                    }else{
                                        resolve(param);
                                    }
                                })
                            }else{
                                resolve(param);
                            }
                        }
                    });
                }else{
                    resolve(param)
                }
            })
            
        })
    }

    /**
    *   @description: Função responsavel pelo retorno do codigo do pedido
    *   @param: param = {order: int}
    *   @return: orderId
    */
    _controlOrder(param){

        var that = this;
        return new Promise(function(resolve, reject){

            if(param.order == 0){
                var paramInsert = {
                    client : param.client
                }
                that.orderModel.insert(paramInsert).then((retorno) => {
                    resolve(retorno.insertId)
                })
            }else{
                resolve(param.order)
            }
            
        })
    }

    /**
    *   @description: Função responsavel pela validação
    *   @param: campos
    *   @return: false or error
    */
    _validation(fields, action){
        var erro = [];

        if(!fields.client || /[^0-9\.]/.test(fields.client)){
            erro.push('Cliente inválido')
        }

        if(!fields.product || /[^0-9\.]/.test(fields.product)){
            erro.push('Produto inválido')
        }

        if(erro.length > 0){
            return erro;
        }

        return false;
    }
}
module.exports = new OrderController();