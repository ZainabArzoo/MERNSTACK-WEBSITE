import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyD55nf6tplSt-VFDXTwtyk3cGoS4JU5wzk",
  authDomain: "mernstack-api.firebaseapp.com",
  projectId: "mernstack-api",
  storageBucket: "mernstack-api.appspot.com",
  messagingSenderId: "417539223255",
  appId: "1:417539223255:web:0380a70b50635f1a30ca92"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);