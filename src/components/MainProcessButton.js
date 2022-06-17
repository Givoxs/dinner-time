import React from "react";

function MainProcessButton({textbutton}) {

    return (
        <>
            <button type="button" className="buttons-homepage">
                {textbutton}
            </button>
        </>
    );
}

export default MainProcessButton;