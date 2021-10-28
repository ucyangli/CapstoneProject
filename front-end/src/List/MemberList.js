import React from 'react';
import PropTypes from 'prop-types';
import MemberCard from '../cards/MemberCard'


const MemberList = ({ member,role, deleteMember }) => {
    const emptyMessage = (
        <tbody>
            <tr>
            <th scope="row">There is no {role}  yet in this lab</th>
            <td></td>
            <td></td>
            <td></td>
         </tr>
            
            
        </tbody>
    );


    

    const memberList = (
        <>
            <tbody>
                {
                    member.map((member) =>  <MemberCard member= {member} key= {member._id} deleteMember ={deleteMember}  />)
                }
            </tbody>
            
          </>
    );
    return (
        <>
            {member.length === 0 ? emptyMessage : memberList }
        </>
    )
}

MemberList.propTypes = {
    member: PropTypes.array.isRequired
}

export default MemberList;