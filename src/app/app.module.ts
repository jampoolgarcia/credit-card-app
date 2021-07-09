// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// root
import { AppComponent } from './app.component';

// components
import { FormCardComponent } from './components/form-card/form-card.component';
import { ListCardComponent } from './components/list-card/list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FormCardComponent,
    ListCardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
