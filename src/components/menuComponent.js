import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'

function RenderMenuItem({dish}){
    return (
        <div className = "col-md-5 m-1">
            <Card>
                <Link to = {`/menu/${dish.id}`}>
                    <CardImg width = "100%" src = {dish.image} alt ={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>
        </div>    
    );
}


 const Menu  = (props) => {
        
        const menu = props.dishes.map((dish) => {
            return (
                <RenderMenuItem dish = {dish}/>
            );
        });


        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to ='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className  = "col-12">
                    <h3> Menu </h3>
                    <hr />
                </div>
                <div className="row">
                        {menu}
                </div>
            </div>
        );
    
}


export default Menu;
