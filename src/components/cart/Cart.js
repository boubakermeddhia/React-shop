import React, { Component } from 'react'
import Title from '../title'
import Cartcolumns from './Cartcolumns'
import Emptycart from './Emptycart'
import {ProductConsumer} from '../../context'
import Cartlist from './cartlist'
import Carttotal from './carttotal'
export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value=>{
                        const {cart}=value;
                        if (cart.length>0){
                            return(
                            <React.Fragment>
                            <Title name='your' title='cart'/>
                            <Cartcolumns/>
                            <Cartlist value={value}/>
                            <Carttotal value={value}/>
                            </React.Fragment>)
                        }else{
                           return(<Emptycart/>) 
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}

