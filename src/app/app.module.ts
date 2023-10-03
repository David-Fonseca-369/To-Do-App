import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//Agregamos módulos para firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { SharedService } from './shared.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from './material/material.module';

//También activa el binding de doble vía 'Forms module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: 'AIzaSyAAELnwXt1aRXMRkBpf4MzY2EwTSzs9rKU',
  authDomain: 'to-do-app-ad647.firebaseapp.com',
  projectId: 'to-do-app-ad647',
  storageBucket: 'to-do-app-ad647.appspot.com',
  messagingSenderId: '328990237136',
  appId: '1:328990237136:web:bdbd434bf8f089ef4b19d5',
  measurementId: 'G-WQ6S7J2DSK',
};
@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [
    BrowserModule,
    //importamos
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
