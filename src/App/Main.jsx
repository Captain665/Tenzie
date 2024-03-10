import React from "react";

export default function Dies(props) {


    return (
        <div
            className={`md:p-2 p-2 px-6 md:px-0 border shadow-xl rounded-lg flex justify-center items-center text-xl 
            ${props?.isHeld ? "bg-[#59E391]" : "bg-white"} ${props.winner && "bg-opacity-50"}`}
            onClick={props.holdDice}
        >
            <h2 className="md:text-4xl text-2xl">{props.value}</h2>
        </div>
    )
}
