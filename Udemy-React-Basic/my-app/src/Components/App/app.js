import './app.css';
import AppInfo from '../App-info/app-info';
import SearchPanal from '../Search-panel/search-panel';
import AppFilter from '../App-filter/app-filter';
import EmployeesList from '../Employees-list/employees-list';
import EmployeesAddForm from '../Employees-add-form/employees-add-form';
import { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name: 'Myroslav' , salary: 2000, increase: false, rise: false, id : 1},
                {name: 'Vlad' , salary: 3000, increase: true, rise: true, id : 2},
                {name: 'Volodymyr' , salary: 4000, increase: false, rise: false, id : 3},
            ],
            term: '',
            filter: 'all',
        }
        this.maxId = 4;
    }


    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    deleteItem = (id) => {
       this.setState(({data}) => {
        // const index = data.findIndex(elem => elem.id === id);
        

        return {
            data : data.filter(item => item.id !== id)
        }

       }) 
    }

    onToggoleIncrease = (id) => {
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)];

        //     return {
        //         data: newArr,
                
        //     }
        // })
          this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, increase: !item.increase }
                }
                return item;
            })
          }))

    }
    
    onToggoleRice = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, rise: !item.rise }
                }
                return item;
            })
          }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise': 
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    

   render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                employees = {employees}
                increased = {increased}
                     />

                <div className='search-panal'>
                    <SearchPanal 
                    onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter filter = {filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList
                data = {visibleData}
                onDelete = {this.deleteItem}
                onToggoleIncrease = {this.onToggoleIncrease}
                onToggoleRice = {this.onToggoleRice}
                />
                <EmployeesAddForm
                onAdd = {this.addItem}
                />
            </div>
        
        )
    }
}

export default App;