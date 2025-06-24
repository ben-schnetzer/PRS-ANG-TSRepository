import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './core/not-found/not-found/not-found';
import { UserList } from './feature/user/user-list/user-list';
import { UserCreate } from './feature/user/user-create/user-create';
import { UserEdit } from './feature/user/user-edit/user-edit';
import { UserDetail } from './feature/user/user-detail/user-detail';
import { VendorList } from './feature/vendor/vendor-list/vendor-list';
import { VendorCreate } from './feature/vendor/vendor-create/vendor-create';
import { VendorEdit } from './feature/vendor/vendor-edit/vendor-edit';
import { VendorDetail } from './feature/vendor/vendor-detail/vendor-detail';
import { ProductList } from './feature/product/product-list/product-list';
import { ProductCreate } from './feature/product/product-create/product-create';
import { ProductEdit } from './feature/product/product-edit/product-edit';
import { ProductDetail } from './feature/product/product-detail/product-detail';
import { RequestList } from './feature/request/request-list/request-list';
import { RequestCreate } from './feature/request/request-create/request-create';
import { RequestEdit } from './feature/request/request-edit/request-edit';
import { RequestDetail } from './feature/request/request-detail/request-detail';
import { LineItemList } from './feature/lineItem/line-item-list/line-item-list';
import { LineItemCreate } from './feature/lineItem/line-item-create/line-item-create';
import { LineItemEdit } from './feature/lineItem/line-item-edit/line-item-edit';
import { LineItemDetail } from './feature/lineItem/line-item-detail/line-item-detail';
import { UserLogin } from './feature/user-login/user-login';
import { Home } from './feature/home/home';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'user-list', component: UserList },
  { path: 'user-create', component: UserCreate },
  { path: 'user-edit/:id', component: UserEdit },
  { path: 'user-detail/:id', component: UserDetail },
  { path: 'vendor-list', component: VendorList },
  { path: 'vendor-create', component: VendorCreate },
  { path: 'vendor-edit/:id', component: VendorEdit },
  { path: 'vendor-detail/:id', component: VendorDetail },
  { path: 'product-list', component: ProductList },
  { path: 'product-create', component: ProductCreate },
  { path: 'product-edit/:id', component: ProductEdit },
  { path: 'product-detail/:id', component: ProductDetail },
  { path: 'request-list', component: RequestList },
  { path: 'request-create', component: RequestCreate },
  { path: 'request-edit/:id', component: RequestEdit },
  { path: 'request-detail/:id', component: RequestDetail },
  { path: 'line-item-list', component: LineItemList },
  { path: 'line-item-create', component: LineItemCreate },
  { path: 'line-item-edit/:id', component: LineItemEdit },
  { path: 'line-item-detail/:id', component: LineItemDetail },
  { path: 'user-login', component: UserLogin },
  { path: 'home', component: Home },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [
RouterModule.forRoot(routes, {
  initialNavigation: 'enabledBlocking',
  onSameUrlNavigation: 'reload'
})
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}