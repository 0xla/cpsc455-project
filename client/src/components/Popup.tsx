import React from "react";

export default function Popup({onClose, visible, target, userData}: any) {
    
    const dummyArray = [
        {
            id: "firstID",
            username: "firstName"
        }, 
        {
            secondID: "secondID",
            username: "secondName"
        }, 
        {
            thirdID: "thirdID",
            username: "thirdName"
        }, 
        {
            fourthID: "fourthID", 
            username: "fourthName"
        }, 
        {
            fifthID: "fifthID", 
            username: "fifthName"
        }];
    let usernameList;
    
    if(userData && target){
        console.log(target)
        console.log("popup userdata", userData[target]);
        usernameList = (userData[target]).map((element: any) => element.username);
    }
    if(!visible)
    return null;
    console.log(userData)
    function handleOnClick (e: any) {
        if(e.target.id === "container"){
            onClose();
        }
    }

  return (
    <div onClick={(e) => handleOnClick(e)}
        id="container"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col bg-white p-2 rounded w-72">
        {/* <div>{userData && <div>print {userData[target]}</div>}</div> */}
        <ul className="list-none">
            <span className="font-semibold text-lg ">
                List of {target}
            </span>
        {
            usernameList && usernameList.length>0 ? 
            (<div>{
                usernameList.map((element: any) => 
                {
                    return <li className="border-b-[1.5px]">{element}</li>
                })
                }</div>) : <div>No {target}</div>
        }
        </ul>
      </div>
    </div>
  );
}