import  React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import {FadeTransform, Fade, Stagger} from 'react-animation-components'


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    
    handleSubmit = (values) => {
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    
    render () {
        return (
                    
            <div>
                <Button type="submit" color="primary" onClick = {this.toggleModal} >
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            
                            <Row className="form-group m-1">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                                className="form-control"
                                                defaultValue = "1"
                                                >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                </Control.select>
                            </Row>
                               
                            <Row className="form-group m-1">
                                <Label htmlFor="name">Your Name</Label>
                                <Control.text model=".name" id="name" name="name"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                />
                                <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                />
                            </Row>
                                
                            <Row className="form-group m-1">
                                <Label htmlFor="message" >Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" 
                                        className="form-control" />
                            </Row>

                            <Row className="form-group ml-1 mt-2">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        );            
    }
}


function RenderDish({dish}){
        return (
            
            <div className="col-md-5 m-1">
                <FadeTransform in transformProps = {{
                exitTransform: 'scale(0.5) translateY(-50%)'
             }}>
                            <Card>
                                <CardImg width="100%" src = {baseUrl + dish.image} alt ={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{ dish.description }</CardText>
                                </CardBody>
                            </Card>
                </FadeTransform>
            </div>
        );
    } 

function RenderComments({comms, postComment, dishId}){
        const com = comms.map((dish) => {
            if(dish.comment != null ){
                return (
                    <div>
                        <ul className = "list-unstyled">
                            <Stagger in>
                            <li> {dish.comment} </li>
                            <li> --{dish.author} , {dish.date} </li>
                            </Stagger>
                        </ul>
                    </div>
                );
            }
            else{
                return ( <div></div> );
            }
        });
        com.push(<CommentForm dishId = {dishId} postComment = {postComment} />);
        return com;
}

const Dishdetail = (props) => {    
        if(props.isLoading){
            return (
                <div className = "container">
                    <div className = "row">
                        <Loading />
                    </div>    
                </div>

            );
        }
        else if (props.errMess){
            return (
                <div className = "container">
                    <div className = "row">
                        <h4>{props.errMess}</h4>
                    </div>    
                </div>

            );
        }
        if(props.dish != null){
                return(
                    <div className = "container">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to ='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className  = "col-12">
                            <h3> {props.dish.name} </h3>
                            <hr />
                        </div>
                        
                        <div className = "row">   
                                <RenderDish dish = {props.dish} />
                                <div className = "col-md-5 m-1">
                                    <h4>Comments</h4>
                                    <RenderComments comms = {props.comments}
                                        postComment = {props.postComment}
                                        dishId = {props.dish.id}
                                    />
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