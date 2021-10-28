import React from 'react';
import PropTypes from 'prop-types';
import PartnerCard from '../cards/PartnerCard'

const CurrentPartnerList = ({ partner, deletePartner }) => {
    const emptyMessage = (
        <p>
            There is no partner yet in this lab
        </p>
    );
    

    const partnerList = (
        <div className='container'>
            <div  className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3 my-3">
                {
                    partner.map((partner) =>  <PartnerCard partner= {partner} deletePartner= {deletePartner} key= {partner._id}  />)
                }
            </div>
        </div>
    );
    return (
        <div>
            {partner.length === 0 ? emptyMessage : partnerList }
        </div>
    )
}

CurrentPartnerList.propTypes = {
    partner: PropTypes.array.isRequired
}

export default CurrentPartnerList;