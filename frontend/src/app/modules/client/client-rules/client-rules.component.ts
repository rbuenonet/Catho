import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../../service/client.service';
import { RuleService } from '../../../service/rule.service';

declare var swal;

@Component({
  selector: 'app-client-rules',
  templateUrl: './client-rules.component.html',
  styleUrls: ['./client-rules.component.css']
})
export class ClientRulesComponent implements OnInit {

  private dados = { id: 0, rules: [] };
  private dadoAtual = {};
  private displayModal = 'none';
  private action = 'I';

  constructor(  private route : ActivatedRoute, 
                private router : Router, 
                private clientService : ClientService, 
                private ruleService : RuleService 
  ) {}

  ngOnInit() {
    this.loadList();
  }

  loadList(){
    this.apagarDadosAtuais();
    this.displayModal = 'none';
    
    var client_id;
    var that = this;

    this.route.params.subscribe(params => {
      client_id = params['id']; 
      that.clientService.listRules(client_id).then(retorno => {
        if(retorno.erro.length > 0){
          swal(
              retorno.message,
              '',
              'error'
          ).then(
            function() {
              that.router.navigate(['client']);
            })

          return;
        }

        that.dados = retorno.retorno;
      })
    });
  }

  openModal(client){
    this.action = 'U';
    this.dadoAtual = Object.assign({}, client);
    if(client == undefined){
      this.apagarDadosAtuais();
      this.action = 'I';
    }
    
    this.displayModal = 'block';
  }

  closeModal(){
    this.displayModal = 'none';
  }

  saveModal(){
    if(  this.action == 'U' ){
      this.ruleService.updateRules(this.dadoAtual).then(retorno => {
        this.validarRetorno(retorno);
      })
    }else{ 
      this.ruleService.insertRules(this.dadoAtual).then(retorno => {
        this.validarRetorno(retorno);
      })
    }
    
  }

  apagarDadosAtuais(){
    this.dadoAtual = {
        client : this.dados.id,
        prefix : '',
        description : '',
        param : ''
    }
  }

  validarRetorno(retorno){
    var that = this;

    if(retorno.erro.length > 0){
      var erros = "<ul>";
      for (var i = 0; i < retorno.erro.length; i++) {
        if(typeof retorno.erro[i] == 'string')
          erros += "<li> - " + retorno.erro[i] + "</li>";
        else
          erros += "<li>" + JSON.stringify(retorno.erro[i]) + "</li>";
      }
      erros += "</ul>";

      swal(
        retorno.message,
        erros,
        'error'
      )
      return;
    }else{
      swal(
        retorno.message,
        erros,
        'success'
      ).then(function(){

        that.loadList();

      })
      return;
    }
  }
}
