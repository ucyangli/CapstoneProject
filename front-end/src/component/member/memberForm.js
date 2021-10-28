import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import {saveMember, putMember, fetchMBDtails} from '../../actions/member';
import {Redirect} from 'react-router-dom';

class MemberForm extends React.Component {

    state = {
        _id: this.props.member ? this.props.member._id : '',
        name: this.props.member ? this.props.member.name : '',
        email: this.props.member ? this.props.member.email :'',
        role: this.props.member ? this.props.member.role :'',
        img: this.props.member ? this.props.member.img :'',
        isCurrent:  this.props.member ? this.props.member.isCurrent : false,
        uploadimg:'',
        errors: {},
        loading: false,
        done: false,
    };
    
    componentDidMount() {

        if(this.props.match.url.includes('/edit')) {
            this.props.fetchMBDtails(this.props.match.params.id)
            .then(() => {
                this.setState({
                    _id: this.props.member._id,
                    name: this.props.member.name,
                    email:  this.props.member.email,
                    role: this.props.member.role,
                    img: '/'+ this.props.member.img,
                    isCurrent:  this.props.member.isCurrent
                })

            })
        };

     }

    handleChange = (e) => {
        // if(e.target.name === 'pjs' ) {
        //     let value = Array.from(e.target.selectedOptions, option => option.value);
        //     this.setState({
        //         pjs: value
        //     })
        // }
        if(e.target.name === 'img' ){
            let file = e.target.files[0];
            if(file.zie > 2*1024*1024) {
                alert('oversize pic, please choose another',3)
            }else {
                this.setState({img: file})
                const imgurl = URL.createObjectURL(file);
                this.setState({
                    uploadimg:imgurl
                })
                }
         }else if(e.target.name === 'isCurrent') {
            this.setState({
                isCurrent: !this.state.isCurrent
            })
         }else {
            this.setState({[e.target.name]: e.target.value});
         }

         console.log(this.state.isCurrent);

    };

    handdleSubmit =  (e) => {
        e.preventDefault();
        let errors = {};
        if(this.state.name === "") errors.name = "can't be empty";
        if(this.state.role === "") errors.role = "can't be empty";
        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;
        if(isValid) {
            const {_id} = this.state;
            let form = new FormData(this.form);
            // for (let [key, value] of form.entries()) {
            //     console.log(`${key}: ${value}`);
            //   }
            this.setState({loading: true});     
            let save = async  () => {
                return this.props.saveMember(form)
            }
            let update = async  () => {
                return this.props.putMember(form)
            }

            if(_id) {
                form._id = _id;
                update().then(this.setState({done: true}))
            }else {

                save().then(this.setState({done: true}))

            }
            

        }
    };

    render() {

        const form = (
            <form className={classnames('table')} onSubmit= {this.handdleSubmit} ref={el => (this.form = el)}>

               {!!this.state.errors.global && <div> {this.state.errors.global} </div>}
            

               <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className= {classnames('form-control',{error:!!this.state.errors.name} )}
                        name="name" 
                        value = {this.state.name}
                        onChange = {this.handleChange}
                        placeholder="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email"
                        className= {classnames('form-control')}
                        name="email" 
                        value = {this.state.email}
                        onChange = {this.handleChange}
                        placeholder="email"
                         /> 
                 </div>
                 <div>
                    <span >Please choose the role</span>
                    <select 
                    name="role" 
                    value = {this.state.role}
                    className= { classnames("form-select ",{error:!!this.state.errors.role}) } 
                    aria-label="Default select example" onChange = {this.handleChange} required>
                        <option defaultValue></option>
                        <option value="Professor">Professor</option>
                        <option  value="PhD">PhD</option>
                        <option value="PostGraduate">Post Graduate</option>
                        <option value="UnderGraduate">Under Graduate</option>
                    </select>
                </div>
                <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" name="isCurrent" 
                checked={this.state.isCurrent}
                value='true' onChange = {this.handleChange}  />
                <label className="form-check-label" htmlFor="isCurrent">
                    Is the member current?
                </label>
                </div>
                {/* <div className="form-check">
                    <input name='admin' className="form-check-input" type="checkbox" onChange = {this.handleChange} defaultValue id="admin" />
                    <label className="form-check-label" htmlFor="admin">
                    Is this and Admin?
                    </label>
                </div>
                <div>
                <label className="form-check-label" htmlFor="project">
                    please choose the projects he/she participate in as a member (hold 'ctrl' to choose more)
                    </label>
                    <br/>
                <select name="pjs" className="selectpicker w-100" onChange = {this.handleChange} multiple>
                    {
                        this.props.project.filter(e=>e.status ==='current').map((project) =>  <option value= {project._id} key={project._id} > {project.title} </option>)
                    }
                    
                </select>
                </div>  
                <div>
                <label className="form-check-label" htmlFor="project">
                    please choose the projects he/she participate in as a leader (hold 'ctrl' to choose more)
                    </label>
                    <br/>
                <select name="pjs" className="selectpicker w-100" onChange = {this.handleChange} multiple>
                    {
                        this.props.project.filter(e=>e.status ==='current').map((project) =>  <option value= {project._id} key={project._id} > {project.title} </option>)
                    }
                    
                </select>
                </div>  */}

                <div className="w-25 h-25">
                  {typeof(this.state.img)==='string' ? <img  src= {this.state.img} className="card-img-top w-100" alt="no cover" /> :
                    <img  src= {this.state.uploadimg} className="card-img-top w-100" alt="please choose an image" />
                  }
                  {/* <img  src= {this.state.img} className="card-img-top w-100" alt={this.state.uploadimg} /> */}
                </div>
                
                <div>
                <label htmlFor="image">Upload Image</label>
                <input onChange = {this.handleChange} type="file" id="image"
                       name="img"  accept="image/png, image/jpeg" />
                 </div>
                 
                 <div className={classnames("col-auto mt-3")}>
                    <button type="submit"  className={classnames("btn btn-primary mb-3")}>submit</button>
                </div>
                 
           </form>

        )
        return (
            <div>
                {
                    !!this.state.done ? <Redirect to="/Member" /> : form
                 }        
             </div>

           
     );
  }
};

const mapStatetoprops = (state,props) => {
    
      return { 
          member: state.member,
          project: state.project 
    };
};

MemberForm.propTpyes = {
    member: PropTpyes.array.isRequired,
    fetchMember: PropTpyes.func.isRequired,
    saveMember: PropTpyes.func.isRequired,
    putMember: PropTpyes.func.isRequired,

}

 
export default connect(mapStatetoprops, {saveMember, fetchMBDtails, putMember}) (MemberForm);