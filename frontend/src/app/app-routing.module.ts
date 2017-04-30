import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from './modules/client/client-list/client-list.component';
import { ClientRulesComponent } from './modules/client/client-rules/client-rules.component';
import { ClientNewOrderComponent } from './modules/client/client-new-order/client-new-order.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
    { path: 'client', component: ClientListComponent },
    { path: 'client/:id/rules', component: ClientRulesComponent },
    { path: 'client/:id/new-order', component: ClientNewOrderComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
