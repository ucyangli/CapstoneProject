import React, { Component } from 'react';
import  Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

import projects from '../data/Project.json'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CardImg from 'react-bootstrap/CardImg';
import Button from 'react-bootstrap/Button'



export default class Main extends Component {
    render() {

        const pj = projects.filter((p) =>  p.isFeatured === true);

        return (
            <Container>
                <div className='mb-5'>

                    {/* this is the brief of the lab */}
                    <h4 className='mb-3 text-center'>UC Colaborative Robotic Laboratory</h4>
                    <p>The Collaborative Robotics Lab develops technologies, frameworks, and communities, enabling meaningful Human-Robot Interactions (HRI) in the wild. </p>
                    <p>Our work is inherently multidisciplinary and transcends traditional discipline boundaries in meaningful and significant ways. </p>
                    <p>The program brings together researchers from such diverse fields as the arts, humanities, design, psychology, computing, and engineering under the broad scope of Human-Centred Technology.</p>
                </div>

                    {/* this is the carousel of featured project */}
                <Carousel variant="dark" style={{heigh: '60rem'}} className='d-none d-md-block' controls={false}>
                    {
                        pj.map((p) => {
                            return (
                                <Carousel.Item >
                                    <Card>
                                        <Row>
                                        <Col xs={4} className='mt-1'>
                                        <Card.Body id="cs-card-body" >
                                        <Card.Title id="cs-card-title" as='h1'className='d-block' >{p.title}</Card.Title>
                                        <Card.Text id="cs-card-text" className='d-block mt-4'> 
                                        {p.brief}
                                        </Card.Text>
                                        <Link to={'/project/'+ p._id } className='card-btn' id='cs-card-btn'><Button variant="primary">Learn More</Button> </Link>
                                        </Card.Body>  
                                        </Col>
                                        <Col xs={8}>
                                        <CardImg id="cs-card-img"  src={p.cover}/>
                                        </Col>
                                       
                                        </Row>
                                    </Card>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
                <Carousel style={{heigh: '60rem'}} className='d-block d-md-none' controls={false}>
                    {
                        pj.map((p) => {
                            return (
                                <Carousel.Item >
                                    <img
                                        id="md-cover"
                                        className="d-block w-100"
                                        src={p.cover}
                                        alt="slides"
                                        />
                                    <Carousel.Caption>
                                    {/* <h3 id="md-cap">{p.title}</h3> */}
                                    <Link to={'/project/'+ p._id } className='card-btn'><Button variant="secondary"  id="md-btn">Learn More</Button> </Link>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>

           </Container>
         )}
}
