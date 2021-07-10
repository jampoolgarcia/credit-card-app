// core modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// external modules
import { ToastrModule } from 'ngx-toastr';

// root
import { AppComponent } from './app.component';

// components
import { FormCardComponent } from './components/form-card/form-card.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    FormCardComponent,
    ListCardComponent,
    SpinnerComponent
  ],
  imports: [
    // core
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // firestore
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,

    // external module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
