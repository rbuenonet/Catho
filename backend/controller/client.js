class ClientController{
    constructor(){
        this.clientModel = require('../model/client');
        this.ruleModel = require('../model/rule');
    }

    /**
    *   @description: Controller responsavel pela listagem
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    list(req, res, next){
        var that = this;

        that.clientModel.list().then((data) => {
            if(data.length == 0){
                res.json({ message: 'Nenhum cliente encontrado', erro: [], retorno: data });
            }else{
                res.json({ message: 'Listagem de clientes', erro: [], retorno: data });
            }
            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar a listagem de clientes', erro: data, retorno: [] });
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

        var param = [
            req.params.id
        ]

        that.clientModel.consult(param).then((data) => {
            if(data.length == 0){
                res.json({ message: 'Cliente não encontrado', erro: [{message: 'Cliente não encontrado'}], retorno: [] });    
            }else{
                res.json({ message: 'Cliente encontrado', erro: [], retorno: data[0] });
            }

            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar as informações do cliente', erro: data, retorno: [] });
            next();
            return;
        })
    }

    /**
    *   @description: Controller responsavel pela consulta
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    consultRules(req, res, next){
        var that = this;

        var param = [
            req.params.id
        ]

        that.clientModel.consult(param).then((data) => {
            if(data.length == 0){
                res.json({ message: 'Cliente não encontrado', erro: [{message: 'Cliente não encontrado'}], retorno: data });    
            }else{
                var retorno = data[0];
                
                var param = [
                    retorno.id
                ]

                that.ruleModel.consultOfClient(param).then((data) => {
                    retorno.rules = data;
                    res.json({ message: 'Cliente encontrado', erro: [], retorno: retorno }); 
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as regras do cliente', erro: data, retorno: [] });
                    next();
                    return;
                }) 
            }

            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar as informações do cliente', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro ao inserir o cliente', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = {
            name: req.params.name
        }

        that.clientModel.insert(param).then((data) => {
            that.clientModel.consult([data.insertId]).then((data) => {
                res.json({ message: 'Cliente cadastrado com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações do cliente', erro: data, retorno: [] });
                next();
                return;
            })
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao inserir o cliente', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro na alteração do cliente', erro: erro, retorno: [] });
            next();
            return;
        }

        var param = [
            req.params.name,
            req.params.id
        ]

        that.clientModel.update(param).then((data) => {
            if(data.affectedRows > 0){
                that.clientModel.consult([req.params.id]).then((data) => {
                    res.json({ message: 'Cliente alterado com sucesso', erro: [], retorno: data });
                    next();
                    return;
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as informações do cliente', erro: data, retorno: [] });
                    next();
                    return;
                })
            }else{
                res.json({ message: 'Nenhum cliente alterado', erro: [{message: 'Nenhum cliente alterado'}], retorno: [] });
                next();
                return;
            }
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro na alteração do cliente', erro: data, retorno: [] });
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

        if((!fields.id || /[^0-9\.]/.test(fields.id)) && action != 'I'){
            erro.push('Código inválido')
        }

        if(erro.length > 0){
            return erro;
        }

        return false;
    }
}
module.exports = new ClientController();
