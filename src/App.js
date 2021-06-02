import React from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css"
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Detail from './components/Detail';
import Cart from './components/cart';
import Default from './components/Default';
import Modal from './components/modal';
class App extends React.Component {

  render(){ 
  return (
  <React.Fragment>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={ProductList}/>
        <Route path="/detail" component={Detail}/>
        <Route path="/cart" component={Cart}/>
        <Route component={Default}/>
      </Switch>
      <Modal>

      </Modal>
  </React.Fragment>
  );
}

}
export default App;
