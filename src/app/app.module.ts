// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// firestore module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// root
import { AppComponent } from './app.component';

// components
import { FormCardComponent } from './components/form-card/form-card.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    FormCardComponent,
    ListCardComponent
  ],
  imports: [
    // core
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

    // firestore
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
