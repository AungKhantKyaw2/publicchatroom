
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Authorize } from "./authorize.js";

// UI 

const signupform = document.getElementById('signupform');
const googleloginbtn = document.getElementById('googleloginbtn');

//Login
signupform.addEventListener('submit',(e)=>{
    e.preventDefault();


    const signinemail = document.getElementById('signinemail').value.trim();
    const signinpassword = document.getElementById('signinpassword').value.trim();





    const {loginUser} = Authorize();
      loginUser(signinemail,signinpassword);
});


//Google login

googleloginbtn.addEventListener('click',()=>{

    const {googlelogin} = Authorize();
    googlelogin();
}); 