import React from 'react';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import PartnerList from '../../List/PartnerList';
import {fetchPartner, deletePartner} from '../../actions/partner';


class Partner extends React.Component {
    componentDidMount() {
        this.props.fetchPartner();
    }


    render() {

        if(this.props.partner.length >= 1 ) {
            return (
                <>

                <PartnerList partner = {this.props.partner}  deletePartner= {this.props.deletePartner} />


                <a className="mt-3 btn btn-primary" href="/NewPartner">add new partner</a>
                </>
            )
        }
        return  <>
        <p>loading...</p>
        <a className="mt-3 btn btn-primary" href="/NewPartner">add partner</a>
        </>;;
        
        

    
  }
}

Partner.propTpyes = {
    partner: PropTpyes.array.isRequired,
    fetchPartner: PropTpyes.func.isRequired,
    deletePartner: PropTpyes.func.isRequired

}

const mapStatetoprops = (state) => {
    return {
        partner: state.partner
    };
};
 
export default connect(mapStatetoprops, {fetchPartner, deletePartner})(Partner);