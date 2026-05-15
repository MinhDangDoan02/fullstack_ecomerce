import logo from './logo.svg';
import './App.css';
import Header from './component/Layout/Header';
import MenuLeft from './component/Layout/MenuLeft';
import Detail from './component/Blog/Detail';
import Footer from './component/Layout/Footer';
import { useLocation } from 'react-router-dom';
import Menuleft_Account from './component/Layout/Menuleft_Account';
import { AppProvider } from './component/Context/AppContext';
import { Provider } from "react-redux"
import {store} from './component/Redux/store';



function App(props) {
  let params1 =  useLocation()
  console.log("local",params1)
  return (
    <>
    <Provider store={store}>
        <AppProvider>
        <Header />
      <section>
        <div className='container'>
          <div className='row'>

            {params1['pathname'].includes("/account")? <Menuleft_Account/> : <MenuLeft/> }
            
            {props.children}
          </div>

        </div>
      </section> 
      
      <Footer></Footer>
   
      </AppProvider>
    </Provider>
   
    </>
  );
}

export default App;
