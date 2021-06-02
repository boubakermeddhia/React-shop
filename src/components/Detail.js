import React, { Component } from 'react'
import {ProductConsumer} from '../context'
import {Link} from 'react-router-dom'
import {Buttoncontainer} from './button'
export default class Detail extends Component {
    render() {
        return (
          <ProductConsumer>
            {(value)=>{
               const {id,company,img,info,title,price,inCart}=value.detailProduct;
                return(
                <div className='conatiner py-5'>
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                        <h5>{title}</h5>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-10 mx-auto col-md-6 my-3">
                      <img className="img-fluid" src={img} alt='product'/>
                  </div>
                  <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>Model : {title}</h2>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                        Made by: <span className="text-uppercase">
                            {company}
                        </span>
                    </h4>
                    <h4 className="text-blue">
                        <strong>
                            Price: <span>$</span>
                            {price}
                        </strong>
                    </h4>
                    <p className="text-capitalize font-weight-bold mt-3 nb-0">
                        Some about the product
                    </p>
                    <p className="text-muted lead">
                        {info}
                    </p>
                    <div>
                        <Link to='/'>
                            <Buttoncontainer>
                                back to product
                            </Buttoncontainer>
                        </Link>
                        <Buttoncontainer 
                        cart
                        disabled={inCart?true:false}
                        onClick={()=>{
                            value.addtocart(id);
                            value.openmModal(id);
                        }}
                        >

                            {inCart? 'in Cart':'add to cart'}
                        </Buttoncontainer>
                    </div>
                  </div>
                 </div>
                 </div>
                )
            
            }}

          </ProductConsumer>
        )
    }
}
