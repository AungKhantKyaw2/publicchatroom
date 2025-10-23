import {auth} from "./firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {  sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import {  updateProfile } from "firebase/auth";


import {  signOut } from "firebase/auth";


export function Authorize(){
     
    //Signup
      const registerUser = async(fullname,email,password)=>{


        const defaultprofileimg ="https://cdn-icons-png.flaticon.com/512/149/149071.png";
      try{

    const userCredential=  await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

        //  console.log(user);

      await  updateProfile(user,{
          displayName: fullname, photoURL:defaultprofileimg
        }).then(() => {
                 //Redirect to profile.html
          window.location.href="../index.html";
        });


     

        }catch(error){
             console.log("Error registering users : " , error);
        }

      }

    //Signin

    const loginUser= (email,password)=>{

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          // console.log(userCredential.user);

          //set name to localstorage
          setLocalName(userCredential.user);

            //Redirect to profile.html
          window.location.href="../index.html";
        })
        .catch((error) => {
              console.error("Error Logging in ",error.message);
        });
      
    }

    //Signout
    const logoutuser =()=>{
              
      signOut(auth)
      .then(() => {

        //unset name from localstorage
        unsetLocalName(); 
           window.location.href="../signin.html";
      }).catch((error) => {
          console.error("Error logging out = ",error.message);
      });
    }
    //Reset Password
    const resetPassword =async (email,msg)=>{
     

      try{

          await sendPasswordResetEmail(auth, email);
          msg.textContent=`Password reset email send. Please check your box.`;
          msg.style.color = "green";
          msg.style.fontSize ="11px";

      }catch(error){  
            console.error("Error sending password reset email = ",error.message);

            msg.textContent=`Error : ${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize ="11px";
      }
     
      
    
    }

    //Google Signin

    const googlelogin =()=>{
      const provider = new GoogleAuthProvider();

          signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result);

           //set name to localstorage
           setLocalName(result.user.displayName);

             //Redirect to index.html
          window.location.href="../index.html";
  
        }).catch((error) => {
          console.log("Error Google Login : " , error);
        });

    }

    //Auth Check
    const isLoggedIn =()=>{
      onAuthStateChanged(auth, (userdata) => {
        if (userdata) {

              return true;
        } else {
          
             //Redirect to signin.html
          window.location.href="../signin.html";
        }
      });
    }
    //Get User Info
    
    const getUser =(callback)=>{

      // callback("Hello Sir");

      onAuthStateChanged(auth, (userdata) => {
        if (userdata) {

            callback(userdata);
        }})

    }

    const setLocalName=(userdata)=>{
        localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName=(userdata)=>{
      localStorage.setItem('username');
  }

      return {registerUser,loginUser,logoutuser,resetPassword,googlelogin,isLoggedIn,getUser,setLocalName,unsetLocalName}
}