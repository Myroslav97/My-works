import './app-info.css'


const AppInfo = (props) => {
    const {employees, increased} = props;
    return (
        <div className="app-info">
            <h1>Employee registration at RideCity</h1>
            <h2>Total number of employees: {employees}</h2>
            <h2>Receive a premium: {increased} </h2>

        </div>
    )
}

export default AppInfo;