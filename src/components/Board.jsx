import React, { useEffect, useState } from 'react'
import { cardsArray } from '../constants/constants.js'
import FlipCard from 'react-flipcard'

export const Board = () => {
    const [number, setNumber] = useState(0)
    const [firstSelect, setFirstSelect] = useState('')
    const [secondSelect, setSecondSelect] = useState('')
    const [arrayShuffed, setArrayShuffed] = useState([])
    const [correctArray ,setCorrectArray] = useState([])
    
    const start = () => {
        setCorrectArray([])
        setFirstSelect('')
        setSecondSelect('')
        setArrayShuffed(cardsArray.sort(() => Math.random() - 0.5))
    }

    const selectCard = (option, pairNumber) => {
        setNumber(pairNumber)
        if (firstSelect === '') {
            setFirstSelect(option)
        } else if (secondSelect === '') {
            setSecondSelect(option)
            if (firstSelect === option && number !== pairNumber) {
                setCorrectArray(oldArray => [...oldArray, option])
            }
            setFirstSelect('')
            setSecondSelect('')
        }
    }

    useEffect(() => {
        if (correctArray.length === arrayShuffed.length/2 && correctArray.length > 0) {
            setTimeout(() => {
                alert('win!')
                setCorrectArray([])
            }, 1000);
        }
    }, [correctArray])

    return (
        <div className='board'>
            <button onClick={start}>play</button>
            {
                arrayShuffed.map(item =>
                    <>
                        {
                            correctArray.includes(item.name) || firstSelect === item.name && number === item.pairNumber
                            ?
                            <div style={{cursor:'default'}} className={`card ${correctArray.includes(item.name) ? 'green' : ''} ${firstSelect === item.name && number === item.pairNumber ? 'blue' : ''}`}>
                                {item.name}
                            </div>
                            :
                            <div className={`card`} onClick={() => selectCard(item.name, item.pairNumber)}>
                                {item.name}
                            </div>
                        }
                    </>
                )
            }
        </div>
    )
}
