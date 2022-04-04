import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FbconnectionService {

  //Firebase Connection
  firebaseConfig = {
    apiKey: "AIzaSyA5L8XPq7NlpPcHx4E9u9hUwJY_80C2jds",
    authDomain: "todoapp-e44a6.firebaseapp.com",
    databaseURL: "https://todoapp-e44a6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todoapp-e44a6",
    storageBucket: "todoapp-e44a6.appspot.com",
    messagingSenderId: "425933034571",
    appId: "1:425933034571:web:8638b5b7a39667deef29ce",
    measurementId: "G-Z4HKPB2XFW"
  };

  public app = initializeApp(this.firebaseConfig);
  public auth=getAuth();

  constructor() { }
}
