import {getDoc,getFirestore, collection, addDoc, getDocs} from 'firebase/firestore'
import {db} from "./firebaseCongig";
import React from "react";

export const clickButton = () => {
    let document ={"Country": 'Popularity', "United States": 1};
    let num=1

    const setDoc=(docData)=>{
        document=docData
        console.log(document)
        num+=1
        console.log(num)
    }
    const snapshot = getDocs(collection(db, "test-db"))
    snapshot.then((querySnapshot) => {
        querySnapshot.docs
            .forEach((doc) => {
            console.log(typeof(doc.data()))
            if(typeof(doc.data())=="object"){
                console.log(doc.data())
                setDoc(Object.entries(doc.data()))

            }
        });
    });
    console.log(document)
    return Object.entries(document)

}



