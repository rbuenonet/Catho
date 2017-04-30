import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// component
import { NavbarComponent } from './component/navbar/navbar.component';

//modules
import { HomeComponent } from './modules/home/home.component';
import { ClientListComponent } from './modules/client/client-list/client-list.component';
import { ClientRulesComponent } from './modules/client/client-rules/client-rules.component';
import { ClientNewOrderComponent } from './modules/client/client-new-order/client-new-order.component';

//service
import { ClientService } from './service/client.service';
import { OrderService } from './service/order.service';
import { ProductService } from './service/product.service';
import { RuleService } from './service/rule.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ClientListComponent,
    ClientRulesComponent,
    ClientNewOrderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ClientService, OrderService, ProductService, RuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
