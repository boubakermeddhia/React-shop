import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';

const ProductContext=React.createContext();



class ProductProvider extends Component {
state={
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modalopen:false,
    modalproduct:detailProduct,
    cartsubtotal:0,
    carttaxe:0,
    carttotal:0

};
componentDidMount(){
    this.setproduct()
}
setproduct=()=>{
    let tempproducts=[];
    storeProducts.forEach(item=>{
        const singleitem={...item};
        tempproducts=[...tempproducts,singleitem];
    })
    this.setState(()=>{
        return {products:tempproducts}
    })
}
getitem=(id)=>{
    const product=this.state.products.find(item=>item.id===id);
    return product;
}

handledetail=(id)=>{
const product=this.getitem(id);
this.setState(()=>{
    return {detailProduct:product}
}
)
}
addtocart=(id)=>{
let tempProduct=[...this.state.products];
const index=tempProduct.indexOf(this.getitem(id));
const product=tempProduct[index];
product.inCart=true;
product.count=1;
const price=product.price;
product.total=price;
this.setState(()=>{
    return {products:tempProduct,cart:[...this.state.cart,product] };
},()=>{this.addtotal()});
}

openmModal=(id)=>{
    const product=this.getitem(id);
    this.setState(()=>{
        return {modalproduct:product,modalopen:true}
    })
}
closeModal=()=>{
    this.setState(()=>{
        return{modalopen:false}
    })
}
increment=(id)=>{
let tempcart=[...this.state.cart];
const dh=tempcart.find(item=>item.id===id);
const index=tempcart.indexOf(dh);
const countedprice=tempcart[index];
countedprice.count=countedprice.count+1;
countedprice.total=countedprice.price*countedprice.count;
this.setState(()=>{
return {cart:[...tempcart]}
},()=>{this.addtotal()})
}
decrement=(id)=>{
    let tempcart=[...this.state.cart];
    const dh=tempcart.find(item=>item.id===id);
    const index=tempcart.indexOf(dh);
    const countedprice=tempcart[index];
    if (countedprice.count === 1){
        return null;
    }else{
        countedprice.count=countedprice.count-1;
        countedprice.total=countedprice.price*countedprice.count;
        this.setState(()=>{
        return {cart:[...tempcart]}
        },()=>{this.addtotal()})
    }
}
removeitem=(id)=>{
let tempProduct=[...this.state.products];
let tempcart=[...this.state.cart];
tempcart=tempcart.filter(item=>item.id !==id);
const index=tempProduct.indexOf(this.getitem(id));
let removedproduct=tempProduct[index];
removedproduct.inCart=false;
removedproduct.count=0;
removedproduct.total=0;
this.setState(()=>{
    return{
        cart:[...tempcart],
        products:[...tempProduct]
    }
},()=>{this.addtotal()})
}
clearcaart=()=>{
  this.setState(()=>{
      return{cart:[]}
  },()=>{
      this.setproduct();
      this.addtotal();
  })
}
addtotal=()=>{
    let subtotal=0;
    this.state.cart.map(item=>{subtotal+=item.total});
    const temptax=subtotal*0.19;
    const tax=parseFloat(temptax.toFixed(1));
    const total=subtotal+tax
    this.setState(()=>{
        return{
            cartsubtotal:subtotal,
            carttaxe:tax,
            carttotal:total}
        })
}
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handledetail:this.handledetail,
                addtocart:this.addtocart,
                openmModal:this.openmModal,
                closeModal:this.closeModal,
                clearcaart:this.clearcaart,
                removeitem:this.removeitem,
                decrement:this.decrement,
                increment:this.increment

            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer=ProductContext.Consumer;

export{ProductProvider,ProductConsumer};
