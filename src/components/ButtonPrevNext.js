import React from "react";

function ButtonPrevNext({text}){

    return(
     <>
     <button
         type="button"
         className="buttonprevnext">
         {text}
     </button>
     </>
    )
}

export default ButtonPrevNext