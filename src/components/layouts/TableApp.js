import React from 'react'
import SelectionBar from './SelectionBar'
import SearchBar from './SearchBar'


export default class TableApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      filteredCars: [],
      tariffs_list: [],
      isLoading: false,
      isError: false,
      sortDirection: true,
      selectedCar: ''
      }

    this.handleClick = this.handleClick.bind(this)
    this.getData = this.getData.bind(this)
  }

  // async function to make a request to the API
  async componentDidMount() {
    this.setState({ 
        isLoading: true 
    })
    const response = await fetch('https://city-mobil.ru/api/cars')
    if (response.ok) {
      const data = await response.json()
      this.setState({ 
          cars: data.cars,
          tariffs_list: data.tariffs_list,
          isLoading: false,
          filteredCars: data.cars
        })
    } else {
      this.setState({ 
          isError: true, 
          isLoading: false 
        })
    }
  }
  // table header rendering
  renderTableHeader = () => {
    return this.state.tariffs_list.map(tariff => <th key={tariff} scope='col'>{tariff}</th>)
  
  }

  // changes the sort direction where true means ascending, and false means descending 
  toggleSortDirection = () => {
    this.setState({
        sortDirection: !this.state.sortDirection
    })
  }


  // handles clicks on individual table cells, then the data gets passed to SelectionBar component
  handleClick(mark, model, year='') {
      this.setState({
        selectedCar: mark + ' ' + model + ' ' + year
      })
    }

  // gets data from the SearchBar child component. Assignes the value from the child to filteredCars in the state
  getData(val){
    this.setState({
      filteredCars: val
    })
  }

  // render the body of the table (table cells with data)
  chooseTableDirection = () => {  
    //   false direction - from z to a
    if (this.state.sortDirection === false) {
        return this.state.filteredCars.reverse().map(car => {
            return (
                <tr>
                    <th key={car.model}>{car.mark} {car.model}</th>
                    {this.state.tariffs_list.map(tariff => {
                      if (car.tariffs[tariff] === undefined){
                        return (<td class='clickable-cell' key={car.model+Math.random()} onClick={() => this.handleClick(car.mark, car.model)}>{car.tariffs[tariff] === undefined ? '–' : `${car.tariffs[tariff].year}`}</td> )
                      } else if (car.tariffs[tariff].year) {
                        return (<td class='clickable-cell' key={car.model+Math.random()} onClick={() => this.handleClick(car.mark, car.model, car.tariffs[tariff].year)}>{car.tariffs[tariff] === undefined ? '–' : `${car.tariffs[tariff].year}`}</td> )
                      }
                })}
                </tr>
            )
        })
        // true direction - from a to z
    } else if (this.state.sortDirection === true) {
        return this.state.filteredCars.sort().map(car => {
            return (
                <tr>
                    <th key={car.model}>{car.mark} {car.model}</th>
                    {this.state.tariffs_list.map(tariff => {
                      if (car.tariffs[tariff] === undefined){
                        return (<td class='clickable-cell' key={car.model+Math.random()} onClick={() => this.handleClick(car.mark, car.model)}>{car.tariffs[tariff] === undefined ? '–' : `${car.tariffs[tariff].year}`}</td> )
                      } else if (car.tariffs[tariff].year) {
                        return (<td class='clickable-cell' key={car.model+Math.random()} onClick={() => this.handleClick(car.mark, car.model, car.tariffs[tariff].year)}>{car.tariffs[tariff] === undefined ? '–' : `${car.tariffs[tariff].year}`}</td> )
                      }
                })}
                </tr>
            )
        })
    }  
}



  render() {
        const {cars, tariffs_list, isLoading, isError, searchInput} = this.state

        // ternary operator to handle loading of the API data
        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return cars.length > 0
        ? (
          <div className='table-app'>
            <div>

              <SearchBar 
                cars={this.state.cars}
                filteredCars={this.state.filteredCars}        
                sendData={this.getData}
              />

            </div>

            <div className='table-div'>
              <table> 
                  <thead>
                    <tr>
                      <th onClick={this.toggleSortDirection} id='table-sort-cell'>
                          <div class='mark-model-column'>Марка и модель 
                          <div>{this.state.sortDirection===true 
                              ? <i class="fa fa-arrow-circle-down" aria-hidden="true"></i> 
                              : <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>}
                          </div>
                          </div>
                      </th>
                      {this.renderTableHeader()}
                    </tr>
                  </thead>
                  <tbody>
                    {this.chooseTableDirection()}
                  </tbody>
              </table>
            </div>


            <div>
              <SelectionBar
                car={this.state.selectedCar}
              />
            </div>
          </div>

        )
        : (
            <div>No data</div>
        )
        
  }
}
