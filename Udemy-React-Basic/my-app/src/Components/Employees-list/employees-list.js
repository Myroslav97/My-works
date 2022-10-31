import EmployeesListItem from '../Employees-list-item/employees-list-item';
import './employees-list.css'

const EmployeesList = ({data, onDelete, onToggoleIncrease, onToggoleRice}) => {

    const elements = data.map(item => {

        const {id, ...itemProps} = item;

        return (
            <EmployeesListItem 
            key = {id} 
            {...itemProps}//{item.name} salary = {item.salary}
            onDelete = {() => onDelete(id)}
            onToggoleIncrease = {() => onToggoleIncrease(id)}
            onToggoleRice = {() => onToggoleRice(id)}
            />

        )
    })

    return (
        <ul className="app-list list-group">
          {elements}
        </ul>
    )
}

export default EmployeesList;