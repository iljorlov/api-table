import React from 'react'

const SelectionBar = (props) => {
    if (props.car !== ''){
        return (
            <div className='selection-bar'>
            {props.car.length>0 ? 'Выбран автомобиль ' : ''} {props.car} {Number(props.car.trim().split(' ')[props.car.trim().split(' ').length-1]) > 1900 ? ' года выпуска' : ''}
            </div>
    )
    } else {
        return <span></span>
    }

}

export default SelectionBar
