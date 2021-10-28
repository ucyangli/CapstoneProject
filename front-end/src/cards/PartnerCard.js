import React from 'react';


const PartnerCard = ({partner,deletePartner }) => {

    let url = "/partner/" + partner._id + '/edit';
    return(

        // <div class="col">
        //     Column
        // </div>

        // <tr>
        //     <th scope="row">{partner.title}</th>
        //     <td>{partner.status}</td>
        //     <td><a href={url}   className="col btn btn-primary" style={{marginRight: '10px'}}>edit</a><a className="col btn btn-primary" href={`/partner`} onClick={()=> {deletePartner(partner)}}>Delete</a></td>
        //  </tr>


        <div className="col" >
            <div className="card" >
                <img  style={{width:'100%'}} src= {partner.pic} className="card-img-top" alt="No Cover" />
                <div className="card-body">
                <h5   className="card-title text-center">{partner.name}</h5>
                <p  className="card-text">{partner.brief}</p>
                <a href={url}   className="btn btn-primary" style={{marginRight: '10px'}} >Edit</a> <a className="col btn btn-primary" href={`/partner`} onClick={()=> {deletePartner(partner)}}>Delete</a>

                </div>
            </div>
        </div>
    )
}

export default PartnerCard;