import React from "react";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function Popup({onClose, visible, target, userData}: any) {
    const navigate = useNavigate();
    
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
        usernameList = (userData[target]).map((element: any) => element.username);
    }
    if(!visible)
    return null;
    function handleOnClick (e: any) {
        if(e.target.id === "container"){
            onClose();
        }
    }

    const findUser = (element: string) => {
        onClose();
        navigate(`/${element}`)
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
            (<Stack>{
                usernameList.map((element: any) => 
                {
                    return <Button onClick={()=>findUser(element)} style={{textTransform: 'none'}}>{element}</Button>
                })
                }</Stack>) : <div>No {target}</div>
        }

        </ul>
      </div>
    </div>
  );
}