class RuleController{
    constructor(){
        this.ruleModel = require('../model/rule');
    }

    /**
    *   @description: Controller responsavel pela listagem
    *   @param: req, res, next (parametros padrões do restify)
    *   @return: Object retorno padrão {message : string, erro : object, retorno : object}
    */
    list(req, res, next){
        var that = this;

        that.ruleModel.list().then((data) => {
            if(data.length == 0){
                res.json({ message: 'Nenhum regra encontrada', erro: [], retorno: data });
            }else{
                res.json({ message: 'Listagem de regras', erro: [], retorno: data });
            }
            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar a listagem de regras', erro: data, retorno: [] });
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

        that.ruleModel.consult(param.id).then((data) => {
            if(data.length == 0){
                res.json({ message: 'Regra não encontrado', erro: [], retorno: data });    
            }else{
                res.json({ message: 'Regra encontrada', erro: [], retorno: data[0] });
            }

            next();
            return;
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao recuperar as informações da regra', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro ao inserir a regra', erro: erro, retorno: [] });
            next();
            return;
        }

        if(!req.params.param){
            req.params.param = {}
        }

        var param = {
            client : req.params.client,
            description : req.params.description,
            param : req.params.param,
            prefix : req.params.prefix
        }

        that.ruleModel.insert(param).then((data) => {
            that.ruleModel.consult([data.insertId]).then((data) => {
                res.json({ message: 'Regra cadastrada com sucesso', erro: [], retorno: data });
                next();
                return;
            }).catch((data) => {
                res.json({ message: 'Ocorreu um erro ao recuperar as informações da regra', erro: data, retorno: [] });
                next();
                return;
            })
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro ao inserir a regra', erro: data, retorno: [] });
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
            res.json({ message: 'Ocorreu um erro na alteração da regra', erro: erro, retorno: [] });
            next();
            return;
        }

        if(!req.params.param){
            req.params.param = {}
        }

        var param = [
            req.params.client,
            req.params.description,
            req.params.param,
            req.params.prefix,
            req.params.id
        ]


        that.ruleModel.update(param).then((data) => {
            if(data.affectedRows > 0){
                that.ruleModel.consult([req.params.id]).then((data) => {
                    res.json({ message: 'Regra alterada com sucesso', erro: [], retorno: data });
                    next();
                    return;
                }).catch((data) => {
                    res.json({ message: 'Ocorreu um erro ao recuperar as informações da regra', erro: data, retorno: [] });
                    next();
                    return;
                })
            }else{
                res.json({ message: 'Nenhuma regra alterada', erro: [], retorno: [] });
                next();
                return;
            }
        }).catch((data) => {
            res.json({ message: 'Ocorreu um erro na alteração da regra', erro: data, retorno: [] });
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

        if(!fields.client){
            erro.push('Cliente inválido')
        }

        if(!fields.description){
            erro.push('Descrição inválida')
        }

        if(!fields.prefix){
            erro.push('Prefixo inválido')
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
module.exports = new RuleController();
