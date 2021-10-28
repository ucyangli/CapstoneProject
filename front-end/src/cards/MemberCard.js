import React from 'react';


const MemberCard = ({member , deleteMember}) => {
    // let img;
    // if(member.img) {
    //     img = new Buffer.from(member.img.data).toString("base64")
    // }
    const url = "/member/" + member._id + '/edit';
    return(
        <>
        <tr>
            <th scope="row">{member.name}</th>
            <td>{member.role}</td>
            <td>{member.email}</td>
            <td><a href={url}   className="col btn btn-primary" style={{marginRight: '10px'}}>edit</a><a className="col btn btn-primary" href={`/member`} onClick={()=> {deleteMember(member._id)}}>Delete</a></td>
         </tr>
        {/* <div className="col" > 
            <div className="card" >
                <div sytle={{height:'100px'}}>
                <img style={{objectFit:'cover'}} src= {member.img} className="card-img-top" alt="No Cover" />
                </div>
                <div className="card-body">
                <h5   className="card-title">{member.name}</h5>
                <p  className="card-text">{member.role}</p>
                <a href={`/member/${member._id}/edit`}  className="btn btn-primary">Edit</a>
                <a href='/member' onClick={()=> {deleteMember(member._id)}}   className="btn btn-primary">DELETE</a>
                </div>
            </div>
        </div> */}
        </>
    )
}

export default MemberCard;