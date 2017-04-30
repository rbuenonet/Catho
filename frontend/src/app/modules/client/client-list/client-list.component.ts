import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  private listagem = []

  constructor( private router : Router, private clientService : ClientService ) { }

  ngOnInit() {

    var that = this;

    this.clientService.list().then(retorno => {
      that.listagem = retorno.retorno;
    })

  }

  openPageRules(client){
    this.router.navigate(['client', client, 'rules']);
  }

  openPageNewOrder(client){
    this.router.navigate(['client', client, 'new-order']);
  }

}
