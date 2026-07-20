import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBZnHJQ5sR2nrME9U4_dyum80lOBSqybqY",
  authDomain: "gameresports-b36ac.firebaseapp.com",
  databaseURL: "https://gameresports-b36ac-default-rtdb.firebaseio.com",
  projectId: "gameresports-b36ac",
  storageBucket: "gameresports-b36ac.firebasestorage.app",
  messagingSenderId: "478733206685",
  appId: "1:478733206685:web:476ee4cb69f3c717154074"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const provider = new GoogleAuthProvider();

window.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("googleLogin");

    if(loginBtn){

        loginBtn.onclick = async () => {

            try{

                const result = await signInWithPopup(auth, provider);

                const user = result.user;

                await set(ref(db,"users/"+user.uid),{

                    uid:user.uid,
                    name:user.displayName,
                    email:user.email,
                    photo:user.photoURL,
                    wallet:0,
                    role:"user"

                });

                alert("Login Successful");

                location.href="index.html";

            }catch(err){

                alert(err.message);

            }

        }

    }

});
onAuthStateChanged(auth,(user)=>{

    if(user){

        console.log("Logged In :",user.displayName);

    }else{

        console.log("Not Logged In");

    }

});
