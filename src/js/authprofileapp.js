import { Authorize } from "./authorize.js";
import { Uielement } from "./uielement.js";

// UI 

const userinfodiv = document.getElementById('userinfo');
const logoutbtn = document.getElementById('logoutbtn');


//Authorize instance
const authorize = Authorize();


//Uielement instance
const uiele = Uielement(userinfodiv);

//Get info & render


authorize.getUser((data)=>{
    console.log(data); 

    uiele.userInfoEle(data);
});


//Logout

logoutbtn.addEventListener('click',()=>{

    const {logoutuser} = Authorize();
    logoutuser();
}); 