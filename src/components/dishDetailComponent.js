import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({dish}){
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

function RenderComments({comms}){
        const com = comms.map((dish) => {
            if(dish.comment != null ){
                return (
                    <div>
                        <ul className = "list-unstyled">
                            <li> {dish.comment} </li>
                            <li> --{dish.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dish.date)))}</li>
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

const Dishdetail = (props) => {
        const dish = props.dish;    
        if(dish != null){
                return(
                    <div className = "container">
                        <div className = "row">
                            
                                <RenderDish dish = {dish}/>
                            
            
                            <div className = "col-md-5 m-1">
                                <h4>Comments</h4>
                                <RenderComments comms = {dish.comments} />
                            </div>
                            
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


export default Dishdetail;