import React from "react";
import {useNavigate} from "react-router-dom";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";

export default function Popup({onClose, visible, target, userData}: any) {
    let usernameList;
    const navigate = useNavigate();
    
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

    const navigateToUser = (element: string) => {
        onClose();
        navigate(`/${element}`)
    }

  return (
    <div onClick={(e) => handleOnClick(e)}
        id="container"
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col bg-white p-2 rounded w-72">
        <ul className="list-none">
            <span className="font-semibold text-lg ">
                List of {target}
            </span>
        {
            usernameList && usernameList.length>0 ?
                (<Stack>{
                    usernameList.map((element: any) =>
                    {
                        return <Button onClick={()=>navigateToUser(element)} style={{textTransform: 'none'}}>{element}</Button>
                    })
                }</Stack>) : <div>No {target}</div>
        }
        </ul>
      </div>
    </div>
  );
}