import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import ProjectList from '../List/projectList'
import { Link } from 'react-router-dom'




export default class Project extends Component {
    render() {

        return (
            <div className='container'>
                <Nav variant="tabs">
                    <Nav.Item>
                        <Link to='?current' className='nav-link'>Curren Projects </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='?future' className='nav-link'>Future Projects</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='?past' className='nav-link'>Past Projects</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/project' className='nav-link'>All Projects</Link>
                    </Nav.Item>
                </Nav>
                    <>
                        <ProjectList status= {this.props.location.search} />
                    </>
            </div>
        )
    }
}
