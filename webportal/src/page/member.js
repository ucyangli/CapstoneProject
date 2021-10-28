import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import members from '../data/Member.json'




export default class Member extends Component {
    render() {

        const sorts = (e) => {
            
            return e.filter((e)=>e.role==='Professor').concat(members.filter((e)=>e.role==='PhD')).concat(members.filter((e)=>e.role==='PostGraduate')).concat(members.filter((e)=>e.role==='UnderGraduate'))
        }

       const sortedMembers = sorts(members);
        const createMemberCard = (e) => {
            return (
                e.map((e) => (
                    <>
                    <tr>
                    <td><img className='d-none d-md-inline-block' src= {e.img} style={{width: '30px',  borderRadius: '50%'}} alt=""/> {e.name}</td>
                    <td>{e.role}</td>
                    <td>{e.email}</td>
                    </tr>
                    </>
                ))
            )

        }
        return (
            <div className='container mt-3 pb-5'>
                <Table borderless hover>
                    <thead>
                        <tr className='text-secondary fs-6'>
                        <th>Name</th>
                        <th>role</th>
                        <th>contact</th>
                        </tr>
                    </thead>
                    <tbody>
                     { members.length === 0 ? 'emptyMessage' : createMemberCard(sortedMembers) }
                    </tbody>
                </Table>
            </div>
        )
    }
}
