
import './App.css';
import Sidebar from './component/admin/Sidebar';
import { useLocation } from 'react-router-dom';

function App(props) {
  let params1 = useLocation()
  return (
    <section className="app-shell">
      <div className="app-layout d-flex">
        {!params1.pathname.includes("/login") && !params1.pathname.includes("/register") && (
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        )}
        <div className="content-wrapper flex-grow-1">
          {props.children}
        </div>
      </div>
    </section>
  )
}

export default App;
