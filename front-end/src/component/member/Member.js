import React from 'react';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import MemberList from '../../List/MemberList';
import {fetchMember, deleteMember} from '../../actions/member';


class Member extends React.Component {
    componentDidMount() {
        this.props.fetchMember();
    }


    render() {


        if(this.props.member.length >= 1 ) {
            const currentProf = this.props.member.filter(e=>e.role ==='Professor' && e.isCurrent === true);
            const pastProf = this.props.member.filter(e=>e.role ==='Professor' && e.isCurrent === false);
            const currentPhd = this.props.member.filter(e=>e.role ==='PhD'&& e.isCurrent === true);
            const pastPhd = this.props.member.filter(e=>e.role ==='PhD'&& e.isCurrent === false);
            const currentPg = this.props.member.filter(e=>e.role ==='PostGraduate' && e.isCurrent === true);
            const pastPg = this.props.member.filter(e=>e.role ==='PostGraduate' && e.isCurrent === false);
            const currentUg = this.props.member.filter(e=>e.role ==='UnderGraduate'&&e.isCurrent === true);
            const pastUg = this.props.member.filter(e=>e.role ==='UnderGraduate'&&e.isCurrent === false);


            return (
                <>
                <h4>Current Members</h4>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                    <MemberList member = {currentProf} role='Professor' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {currentPhd} role='PhD' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {currentPg} role='Post Graduate' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {currentUg} role='Under Graduate' deleteMember= {this.props.deleteMember}/>
                </table>

                <h4 className='mt-4'>Past Members</h4>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                    <MemberList member = {pastProf} role='Professor' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {pastPhd} role='PhD' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {pastPg} role='Post Graduate' deleteMember= {this.props.deleteMember} />
                    <MemberList member = {pastUg} role='Under Graduate' deleteMember= {this.props.deleteMember}/>
                </table>

                <a className="mt-3 btn btn-primary" href="/NewMember">add new member</a>

                </>
            )
        }
        return  <>
        <p>loading...</p>
        <a className="mt-3 btn btn-primary" href="/NewMember">add member</a>
        </>;;
        
        

    
  }
}

Member.propTpyes = {
    member: PropTpyes.array.isRequired,
    fetchMember: PropTpyes.func.isRequired,
    deleteMember: PropTpyes.func.isRequired

}

const mapStatetoprops = (state) => {
    return {
        member: state.member
    };
};
 
export default connect(mapStatetoprops, {fetchMember, deleteMember})(Member);