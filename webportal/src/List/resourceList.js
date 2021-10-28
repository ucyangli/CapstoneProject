import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import resources from '../data/Resource.json'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import CardImg from 'react-bootstrap/esm/CardImg';

export default class ResourceList extends Component {

    
    render() {  


        const emptyMessage = (
            <p>
                There is no resouce under this catagory yet in this lab
            </p>
        );

        const createCard = (e) => {
            return ( 
                e.map((p) => (
                    <Col>
                        <Card className="text-center">
                            <Row>
                            <CardImg className='rs-card-img' variant="top"  src={p.rsimg} />
                            <Card.Body>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Text >
                                {p.brief}
                            </Card.Text>
                            <Link to={'/resource/'+ p._id } className='card-btn'><Button variant="primary">Learn More</Button> </Link>
                            </Card.Body>  
                            </Row>
                        </Card>
                    </Col>
             )

                ))}

        return (
            <div className='container'>
            <Row xs={1} xl={3} className="g-4">
            {   
              resources.length === 0 ? emptyMessage : createCard(resources)
            }
            </Row>
           </div>
        )
    }
}
