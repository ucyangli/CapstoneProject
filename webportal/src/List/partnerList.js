import React, { Component } from 'react';
import partners from '../data/Partner.json'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
                            <CardImg variant="top"  src={p.pic} />
                            <Card.Body>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Text >
                                {p.brief}
                            </Card.Text>
                            </Card.Body>  
                            </Row>
                        </Card>
                    </Col>
             )

                ))}

        return (
            <>
            <Row xs={1} md={2} className="g-4">
            {   
              partners.length === 0 ? emptyMessage : createCard(partners)
            }
            </Row>
           </>
        )
    }
}
