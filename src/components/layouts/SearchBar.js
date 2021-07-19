import React, { useState } from 'react'

const SearchBar = (props) => {
    let [input, handleChange] = useState('')
    let [newFilteredCars] = useState(null)
    


    function updateFilteredCars() {
        let carsToCheck = []
        let filteredCars = []
        input = input.trim()
        let inputArr = input.toLowerCase().split(' ')
                            console.log(inputArr.slice(1,inputArr.length+1).join(' '))

        filteredCars = props.cars.filter(car => {
            const modelArr = car.model.toLowerCase().split(' ')
            for (let i of inputArr){
                if (inputArr.length === 1){
                    if (car.mark.toLowerCase().includes(i) || car.model.toLowerCase().includes(i)) {
                    // console.log('car: ',  car)
                    // console.log('input arr: ',inputArr)
                    return car
                }
                } else if (inputArr.length > 1) {
                    if (input.includes(car.mark.toLowerCase()) && modelArr.join(' ').includes(inputArr.slice(1,inputArr.length+1).join(' '))){
                        return car
                    }
                }

                
            }


  
        })

        newFilteredCars = filteredCars
        
        console.log('Child succeeded', newFilteredCars)
        props.sendData(newFilteredCars)
    }


    return (
        <div className='search-bar'>
            <input type='value' value={input} onChange={(event) => handleChange(event.target.value)}></input>
              <button onClick={updateFilteredCars}>Search</button>
        </div>
    )
}

export default SearchBar
