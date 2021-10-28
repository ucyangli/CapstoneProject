import React, { Component } from 'react';
import projects from '../data/Project.json'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CardImg from 'react-bootstrap/esm/CardImg';
import { Link } from 'react-router-dom';




export default class ProjectList extends Component {

    
    render() {  

        const pj = projects.filter((p) =>  this.props.status.includes(p.status));
        console.log(this.props.status === '')
        const emptyMessage = (
            <p>
                There is no project under this catagory yet in this lab
            </p>
        );

        const createCard = (e) => {
            return (
                e.map((p) => (
                    <Row className='my-3 col-xxl-5 mx-1'>
                        <Card>
                            <Row>
                            <Col xs={8}>
                            <CardImg id="pj-card-img" src={p.cover} className=''/>
                            </Col>
                            <Col xs={4} className='mt-1'>
                            <Card.Body id="pj-card-body" >
                            <Card.Title id='pj-card-title'>{p.title}</Card.Title>
                            <Card.Text id='pj-card-text' className='d-xxl-none d-lg-block d-none'> 
                            {p.brief}
                            </Card.Text>
                            <Link to={'/project/'+ p._id } className='card-btn' id='pj-card-btn'><Button variant="primary">Learn More</Button> </Link>
                            </Card.Body>  
                            </Col>
                            </Row>
                        </Card>
                    </Row>
             )

                ))}

        return (
            <>
            <Row className="my-3 h-100">
            {   
             this.props.status === '' ? createCard(projects) : pj.length === 0 ? emptyMessage : createCard(pj)
            }
            </Row>
           </>
        )
    }
}
