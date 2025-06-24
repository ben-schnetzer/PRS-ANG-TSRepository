import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { UserList } from './feature/user/user-list/user-list';
import { UserCreate } from './feature/user/user-create/user-create';
import { UserDetail } from './feature/user/user-detail/user-detail';
import { UserEdit } from './feature/user/user-edit/user-edit';
import { VendorList } from './feature/vendor/vendor-list/vendor-list';
import { VendorCreate } from './feature/vendor/vendor-create/vendor-create';
import { VendorDetail } from './feature/vendor/vendor-detail/vendor-detail';
import { VendorEdit } from './feature/vendor/vendor-edit/vendor-edit';
import { ProductList } from './feature/product/product-list/product-list';
import { ProductCreate } from './feature/product/product-create/product-create';
import { ProductDetail } from './feature/product/product-detail/product-detail';
import { ProductEdit } from './feature/product/product-edit/product-edit';
import { RequestList } from './feature/request/request-list/request-list';
import { RequestCreate } from './feature/request/request-create/request-create';
import { RequestDetail } from './feature/request/request-detail/request-detail';
import { RequestEdit } from './feature/request/request-edit/request-edit';
import { LineItemList } from './feature/lineItem/line-item-list/line-item-list';
import { LineItemCreate } from './feature/lineItem/line-item-create/line-item-create';
import { LineItemDetail } from './feature/lineItem/line-item-detail/line-item-detail';
import { LineItemEdit } from './feature/lineItem/line-item-edit/line-item-edit';
import { Menu } from './core/menu/menu/menu';
import { NotFound } from './core/not-found/not-found/not-found';
import { UserLogin } from './feature/user-login/user-login';
import { RequestLine } from './feature/request/request-line/request-line';

@NgModule({
  declarations: [
    App,
    UserList,
    UserCreate,
    UserDetail,
    UserEdit,
    VendorList,
    VendorCreate,
    VendorDetail,
    VendorEdit,
    ProductList,
    ProductCreate,
    ProductDetail,
    ProductEdit,
    RequestList,
    RequestCreate,
    RequestDetail,
    RequestEdit,
    LineItemList,
    LineItemCreate,
    LineItemDetail,
    LineItemEdit,
    Menu,
    NotFound,
    UserLogin,
    RequestLine
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
