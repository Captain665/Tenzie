import React, { useState } from "react";
import Dies from "./Main";
import { nanoid } from 'nanoid'
import ConfettiExplosion from 'react-confetti-explosion';

export default function RollGame() {

    const [die, setDie] = React.useState(allNewDice())
    const [tenzie, setTenzie] = React.useState(false)
    const [winner, setWinner] = useState(false)
    const [role, setRole] = React.useState(0)

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 8 + 1),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const dieArray = []
        for (let i = 0; i < 10; i++) {
            dieArray.push(generateNewDie())
        }
        return dieArray
    }

    function rollDie() {
        if (!tenzie) {
            setDie(oldDie => oldDie.map(dies => {
                return dies.isHeld ?
                    dies : generateNewDie()
            }))
            setRole(prevalue => prevalue + 1)
        } else {
            setTenzie(false)
            setDie(allNewDice())
            setRole(() => 1)
        }
    }

    function holdDice(id) {
        if (!tenzie) {
            setDie(oldDie => oldDie.map(dies => {
                return dies.id === id ?
                    {
                        ...dies, isHeld: !dies.isHeld,
                    }
                    : dies
            }))
        }
    }

    React.useEffect(() => {
        const allHeld = die.every(dies => dies.isHeld === true)
        const firstDieValue = die[0].value;
        const allValueSame = die.every(dies => dies.value === firstDieValue)
        if (allHeld && allValueSame) {
            setTenzie(() => true)
            setWinner(() => true)

        } else {
            setTenzie(() => false)
        }
    }, [die])


    const dieElement = die.map(dies => (
        <Dies
            key={dies.id}
            value={dies.value}
            isHeld={dies.isHeld}
            holdDice={() => holdDice(dies.id)}
            winner={winner}
        />
    ))


    return (
        <>
            <main className={`bg-white md:w-2/6 w-11/12 md:p-10 p-5 ${winner && "bg-opacity-50"}
         m-auto flex flex-col rounded-3xl md:gap-10 gap-5 justify-around mt-20 shadow-2xl relative`} >
                <ul className="text-center m-0 md:font-normal text-sm">

                    <li className="m-0 text-4xl mb-2">Tenzies</li>
                    <li>Roll until all dice are the same.</li>
                    <li>Click each die to freeze it at its current value between rolls.</li>
                </ul>
                <div className="grid grid-cols-5 md:gap-4 mb-10 md:w-5/6 self-center md:mt-10 mt-5 gap-5">
                    {dieElement}
                </div>
                <button className="bg-[#5035FF] w-36 h-12 border-none rounded-md text-white text-base focus:border-none self-center -mt-5 active:bg-opacity-90"
                    onClick={rollDie}>
                    {tenzie ? "NEW GAME" : "ROLL"}
                </button>
                <div className="text-center flex justify-center w-1/2 self-center text-lg">
                    <p>Roll time: <b>{role}</b></p>
                </div>

                {winner && <section className="absolute overflow-hidden border md:w-1/2 w-3/4 z-50s self-center bg-white flex justify-center align-top p-5 flex-col gap-2 rounded-xl m-auto">
                    <ConfettiExplosion className="self-center" particleCount={300} duration={3000} force={1} particleSize={18}/>
                    <button
                        className="text-4xl self-end w-fit -mt-6"
                        onClick={() => { setWinner(() => false) }}>
                        &times;
                    </button>
                    <img src="https://img.freepik.com/premium-vector/winner-logo-with-trophy_92863-522.jpg" alt="winner logo" />
                </section>}
            </main>

        </>
    )
}