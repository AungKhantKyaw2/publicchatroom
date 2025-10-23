import {db}from "./firebase.js";
import {collection,addDoc, Timestamp,query,where,orderBy, onSnapshot} from "firebase/firestore";

export function Chatroom(room,username){

        let curroom = room;
        let curuser =username;
        const dbRef = collection(db,'chats');
        let unscribe =null;
    const addChat = async (message)=>{

        const now =new Date();
        const chatdata ={

            username:curuser,
            room:curroom,
            message,
            created_at:Timestamp.fromDate(now)
        };

        try{
                const response =await addDoc(dbRef,chatdata);
                return response;

        }catch(err){
             console.log("Error addchat = ",err);
        }
    }

    const getChats = (callback)=>{
        
            // onSnapshot(
            //     query(dbRef,where('room','==',curroom),orderBy('created_at'))
            //     ,docSnap=>{
            //         docSnap.forEach(doc=>{
            //             console.log(doc.data());
            //             callback(doc.data());
            //         });
            //     }
            // );

        // if(unscribe){
        //      unscribe();
        // }


        if(unscribe) unscribe();

         unscribe= onSnapshot(
                query(dbRef,where('room','==',curroom),orderBy('created_at'))
                ,(docSnap)=>{
                    docSnap.docChanges().forEach(item=>{
                        console.log(item);
                        // callback(item.doc.data());

                        if(item.type === "added"){
                            callback(item.doc.data());
                        }
                    });

             
                }
            );
     
    }

    const updateChatroom = (newroom)=>{

        curroom = newroom;
        console.log(`Room changed to ${curroom}`);
    }

    const updateUsername = (newusername)=>{
        curuser = newusername;
        localStorage.setItem('username',curuser);
        console.log(localStorage);
        console.log(`Username Changed to ${curuser}`);
    }

    return {addChat,getChats,updateChatroom,updateUsername};
}