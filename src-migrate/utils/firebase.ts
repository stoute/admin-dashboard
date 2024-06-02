import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from 'firebase/firestore/lite';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export class Firebase {
  app;
  analytics;
  auth;
  db;
  currentUser;
  authenticated = false;

  // constructor() {}

  public async init(config) {
    this.app = initializeApp(config);
    this.auth = getAuth();
    this.db = getFirestore(this.app);
    if (typeof window !== 'undefined') this.analytics = getAnalytics(this.app);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        console.log('fb user signed in');
        this.currentUser = user;
        this.authenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'auth_app_token:' + this.auth.config.authDomain,
            JSON.stringify(user)
          );
        }
      } else {
        // User is signed out
        console.log('fb user signed out');
        this.authenticated = false;
        if (typeof window !== 'undefined') {
          if (
            window.localStorage &&
            window.localStorage.getItem(
              'auth_app_token:' + this.auth.config.authDomain
            )
          ) {
            this.currentUser = undefined;
            window.localStorage.removeItem(
              'auth_app_token' + this.auth.config.authDomain
            );
          }
        }
      }
    });

    // fixme: firebase setPersistence
    // this.auth.setPersistence(this.auth.Auth.Persistence.LOCAL).catch(() => {
    //   console.warn('error on firebase setPersistence');
    // });
  }

  public async login(username, password, type = 'email-password') {
    if (type === 'email-password') {
      const userData = this.auth;
      signInWithEmailAndPassword(this.auth, username, password).catch((err) => {
        console.warn('error on firebase login');
        return err;
      });
      if (userData) {
        this.authenticated = true;
        return userData;
      }
    }
  }

  public async logout() {
    await this.auth.signOut().catch((err) => {
      console.warn('error on firebase logout');
      return err;
    });
    this.authenticated = false;
  }

  public async getCollection(collectionId: string) {
    const docs = [];
    await this.db
      .collection(collectionId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
      })
      .catch((err) => {
        console.warn('error get collection', err);
      });
    return docs;
  }

  public async addDocument(type, id, data) {
    await setDoc(doc(this.db, type, id), data).catch((err) => {
      console.warn('error creating document', err);
      return err;
    });
    return true;
  }

  // example
  public async addUser(data) {
    await this.db
      .collection('users')
      .add(data)
      .then(() => console.log('added user', data));
  }
}
