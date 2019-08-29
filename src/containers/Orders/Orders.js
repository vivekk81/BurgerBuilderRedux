import React from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true,

    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=>{
            const fetchedData = []
            console.log(res.data)
            for(let key in res.data){
                fetchedData.push({
                    ...res.data[key],
                    id: key
                })
            }
            console.log(fetchedData)

            this.setState({loading: false, orders: fetchedData})
        })
        .catch(err=>{
            this.setState({loading: false})
        })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order=>{
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                })}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)