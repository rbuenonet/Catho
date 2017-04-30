import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../../service/client.service';
import { OrderService } from '../../../service/order.service';
import { ProductService } from '../../../service/product.service';

declare var swal;

@Component({
  selector: 'app-client-new-order',
  templateUrl: './client-new-order.component.html',
  styleUrls: ['./client-new-order.component.css']
})
export class ClientNewOrderComponent implements OnInit {

  private dadosCliente = { id: 0 };
  private dadosItem= [];
  private dadosProdutos = [];
  private dadosEnvio = {};
  private pedido_id = 0;
  private pedido_total_real = 0.00;
  private pedido_total_pago = 0.00;
  private displayModal = 'none';

  constructor(  private route : ActivatedRoute, 
                private router : Router, 
                private clientService : ClientService,
                private orderService : OrderService,
                private productService : ProductService
  ) { }

  ngOnInit() {
    this.loadList();

    // this.dadosItem = [
    //         {
    //             "product_price": 322.99,
    //             "product_name": "Standout",
    //             "id": 53,
    //             "product": 2,
    //             "price": 299,
    //             "reason": "DISCOUNT",
    //             "order": 18
    //         },
    //         {
    //             "product_price": 269.99,
    //             "product_name": "Classic",
    //             "id": 54,
    //             "product": 1,
    //             "price": 269.99,
    //             "reason": "",
    //             "order": 18
    //         },
    //         {
    //             "product_price": 394.99,
    //             "product_name": "Premium",
    //             "id": 55,
    //             "product": 3,
    //             "price": 394.99,
    //             "reason": "",
    //             "order": 18
    //         }
    //     ]
  }

  loadList(){
    
    var client_id;
    var that = this;

    this.route.params.subscribe(params => {
      client_id = params['id']; 
      that.clientService.consult(client_id).then(retorno => {
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

        that.dadosCliente = retorno.retorno;
      })
    });
  }

  openModal(client){
    var that = this;
    that.apagarDadosAtuais();
    this.productService.list().then((retorno) => {
      that.dadosProdutos = retorno.retorno;
      that.displayModal = 'block';
    })
  }

  closeModal(){
    this.displayModal = 'none';
  }

  saveModal(){
    var that = this;
    that.orderService.insert(this.dadosEnvio).then((retorno) => {
      var products = retorno.retorno.products;

      that.pedido_id = retorno.retorno.order;
      that.dadosItem = products;
      that.displayModal = 'none';    

      that.pedido_total_pago = 0;
      that.pedido_total_real = 0;

      products.forEach(element => {
        that.pedido_total_pago += element.price
        that.pedido_total_real += element.product_price
      });
    })
  }

  apagarDadosAtuais(){
    this.dadosEnvio = {
        product : '',
        client  : this.dadosCliente.id,
        order : this.pedido_id
    }
  }

}
