import  React, { Component } from 'react';
import { Button, Label, Col, Row, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';


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
        console.log("Current state is :"+ JSON.stringify(values));
        alert("Current state is :"+ JSON.stringify(values));
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

export default CommentForm;
