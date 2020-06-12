import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


function RenderMenuItem({dish , onClick}){
    return (
        <div className = "col-md-5 m-1">
            <Card onClick = {() => onClick(dish.id)}>
                <CardImg width = "100%" src = {dish.image} alt ={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </div>    
    );
}


 const Menu  = (props) => {
        
        const menu = props.dishes.map((dish) => {
            return (
                <RenderMenuItem dish = {dish} onClick = {props.onClick} />
            );
        });


        return (
            <div className="container">
                <div className="row">
                        {menu}
                </div>
            </div>
        );
    
}


export default Menu;
