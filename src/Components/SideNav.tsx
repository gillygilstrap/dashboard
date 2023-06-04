import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable, faChartSimple, faUser } from '@fortawesome/free-solid-svg-icons'

const tableIcon = <FontAwesomeIcon icon={faTable} />
const chartIcon = <FontAwesomeIcon icon={faChartSimple} />
const userIcon = <FontAwesomeIcon icon={faUser} />
  
  export default function SideVav() {
  
    return (
        <div className="w-32 h-full hidden md:flex bg-slate-700 flex flex-col text-white fixed top-20">
            <span className="w-min mx-auto mt-8 hover:cursor-pointer hover:scale-105 hover:text-slate-200">
                <div className="icon-container flex flex-col">
                    <div className="icon text-5xl">{chartIcon}</div>
                    <div className="label text-center mt-1">Stats</div>
                </div>
            </span>
            <span className="w-min mx-auto mt-8 hover:cursor-pointer hover:scale-105 hover:text-slate-200">
                <div className="icon-container flex flex-col">
                    <div className="icon text-5xl">{tableIcon}</div>
                    <div className="label text-center mt-1">Orders</div>
                </div>
            </span>
            <span className="w-min mx-auto mt-8 hover:cursor-pointer hover:scale-105 hover:text-slate-200">
                <div className="icon-container flex flex-col">
                    <div className="icon text-5xl">{userIcon}</div>
                    <div className="label text-center mt-1">Users</div>
                </div>
            </span>
        </div>
    )
  }
  