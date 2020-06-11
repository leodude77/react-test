import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    renderDish(dish){
        return (
            <div className="col-md-5 m-1">
                            <Card>
                                <CardImg width="100%" src = {dish.image} alt ={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{ dish.description }</CardText>
                                </CardBody>
                            </Card>
            </div>
        );
    }

    renderComments(comms){
        const com = comms.map((dish) => {
            if(dish.comment != null ){
                return (
                    <div>
                        <ul className = "list-unstyled">
                            <li> {dish.comment} </li>
                            <li> --{dish.author} </li>
                        </ul>
                    </div>
                );
            }
            else{
                return ( <div></div> );
            }
        })
        return com;
    }

    render(){
        const dish = this.props.dish;    
        if(dish != null){
                return(
                    <div className = "row">
                       
                            { this.renderDish (dish) }
        
                        <div className = "col-md-5 m-1">
                            <h4>Comments</h4>
                            { this.renderComments(dish.comments) }
                        </div>
                        
                    </div>
                );
            }
            else {
                return (
                    <div></div>
                );
            }
    }
}

export default Dishdetail;