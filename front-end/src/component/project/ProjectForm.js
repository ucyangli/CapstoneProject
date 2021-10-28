import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import {saveProject, putProject, fetchPJDtails} from '../../actions/project';
import {fetchMember} from '../../actions/member';
import { fetchPartner } from '../../actions/partner';
import { fetchResource } from '../../actions/resource';
import {Redirect} from 'react-router-dom';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw,convertFromRaw } from 'draft-js';
import  {markdownToDraft,draftToMarkdown }  from 'markdown-draft-js';
// import draftToMarkdown from 'draftjs-to-markdown'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ProjectForm extends React.Component {

    // state = {
    //     _id: this.props.project ? this.props.project._id : '',
    //     title: this.props.project ? this.props.project.title : '',
    //     brief: this.props.project ? this.props.project.brief :'',
    //     detail:this.props.project ? this.props.project.detail :'',
    //     teamleader: this.props.project ? this.props.project.teamleader :'',
    //     member: this.props.project ? this.props.project.member :'',
    //     partner: this.props.project ? this.props.project.partner :'',
    //     supervisor:this.props.project ? this.props.project.supervisor :'',
    //     resource: this.props.project ? this.props.project.resource :'',
    //     cover: this.props.project ? this.props.project.cover :'',
    //     isFeatured: this.props.project ? this.props.project.isFeatured : false,
    //     editorState: EditorState.createEmpty(),
    //     uploadimg: '',
    //     errors: {},
    //     loading: false,
    //     done: false,
    // };

    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.project ? this.props.project._id : '',
            title: this.props.project ? this.props.project.title : '',
            brief: this.props.project ? this.props.project.brief :'',
            detail:this.props.project ? this.props.project.detail :'',
            teamleader: this.props.project ? this.props.project.teamleader :'',
            member: this.props.project ? this.props.project.member :'',
            partner: this.props.project ? this.props.project.partner :'',
            supervisor:this.props.project ? this.props.project.supervisor :'',
            resource: this.props.project ? this.props.project.resource :'',
            cover: '',
            isFeatured:  '',
            editorState: EditorState.createEmpty(),
            uploadimg: '',
            errors: {},
            loading: false,
            done: false,
        };
      }

    componentDidMount() {   

        this.props.fetchMember();
        this.props.fetchPartner();
        this.props.fetchResource();

        if(this.props.match.url.includes('/edit')) {
            this.props.fetchPJDtails(this.props.match.params.id)
            .then(() => {
               let content = convertFromRaw(JSON.parse(this.props.project.detail));
                this.setState({
                    _id: this.props.project._id,
                    title: this.props.project.title,
                    brief:  this.props.project.brief,
                    detail:this.props.project.detail,
                    status: this.props.project.status,
                    supervisor:this.props.project.supervisor,
                    teamleader: this.props.project.teamleader,
                    member: this.props.project.member,
                    partner: this.props.project.partner,
                    resource: this.props.project.resource,
                    cover: '/'+ this.props.project.cover,
                    isFeatured: this.props.project.isFeatured,
                    editorState: EditorState.createWithContent(content)
                })

            })
        };

        



     }

    handleChange = (e) => {


        if(e.constructor.name === 'EditorState'){
            this.setState({
                editorState: e,
              });
          
            this.setState({detail: JSON.stringify(convertToRaw(e.getCurrentContent()))})

        }else if (e.constructor.name === 'SyntheticBaseEvent'){

            console.log(this.props);
            if(e.target.name === 'cover') {
                let file = e.target.files[0];
                if(file.zie > 2*1024*1024) {
                    alert('oversize pic, please choose another',3)
                }else {
                    this.setState({cover: file})
                    const imgurl = URL.createObjectURL(file);
                    this.setState({
                        uploadimg:imgurl
                    })
                    }
             }else if(e.target.name === 'isFeatured') {
                this.setState({
                    isFeatured: !this.state.isFeatured
                })

             }else {
                this.setState({[e.target.name]: e.target.value});   
             }
        }
        
       



    };


    handdleSubmit =  (e) => {

        e.preventDefault();
        let errors = {};
        if(this.state.title === "") errors.name = "can't be empty";
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0;
        if(isValid) {
            const {_id} = this.state;
            let form = new FormData(this.form);
            this.setState({loading: true});     
            
            let save = async  () => {
                return this.props.saveProject(form)
            }
            let update = async  () => {
                return this.props.putProject(form)
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
                    <label htmlFor="title" className="form-label">Title</label>
                    <input 
                        type="text" 
                        className= {classnames('form-control',{error:!!this.state.errors.title} )}
                        name="title" 
                        value = {this.state.title || ''}
                        onChange = {this.handleChange}
                        placeholder="title" required/>
                </div>
                <div>
                <label htmlFor="brief" className="form-label">Brief</label>
                     <textarea 
                        className= {classnames('form-control')}
                        name="brief"
                        value = {this.state.brief}
                        onChange = {this.handleChange} required /> 
                </div>

                <div className="mb-3">
                    <label htmlFor="detail" className="form-label">Detail</label>
                   
                      <Editor
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            editorState={this.state.editorState}
                            onEditorStateChange={this.handleChange}
                        />
                        <textarea
                        name='detail'
                        onChange = {this.handleChange}
                        value={this.state.detail}
                        className= {classnames('form-control')}
                       style={{display:'none'}}
                        />

                 </div>
                 <div>
                    <span >Please choose the status</span>
                    <select 
                    name="status" 
                    value = {this.state.status || ''}
                    className= { classnames("form-select ",{error:!!this.state.errors.status}) } aria-label="Default select example" onChange = {this.handleChange} required>
                        <option defaultValue></option>
                        <option value="past">Past</option>
                        <option  value="current">Current</option>
                        <option value="future">Future</option>
                    </select>
                </div>
                <div>
                <span >Please choose the partner</span>
                <select name="partner" className="form-select w-100" onChange = {this.handleChange} multiple>
                {
                       this.props.partner.map((partner) =>  {
                           if(!!this.state.partner) {
                               if(this.state.partner.includes(partner._id)){
                                return <option value= {partner._id} key={partner._id} selected > {partner.name}</option>
                               }
                           }
                           return <option value= {partner._id} key={partner._id} > {partner.name}</option>
                       })
                    }
                </select>
                </div>  
                <div>
                <span >Please choose the resource</span>
                <select name="resource" className="form-select w-100" onChange = {this.handleChange} multiple>
                {
                       this.props.resource.map((resource) =>  {
                           if(!!this.state.resource) {
                               if(this.state.resource.includes(resource._id)){
                                return <option value= {resource._id ||''}  key={resource._id} selected > {resource.name}</option>
                               }
                           }
                           return <option value= {resource._id} key={resource._id} > {resource.name}</option>
                       })
                    }
                </select>
                </div>  
                <div>
                <span >Please choose the  team leader</span>
                <select name="teamleader" className="form-select w-100" onChange = {this.handleChange} value={this.state.teamleader ||''} required>
                <option value='' ></option>
                    {
                       this.props.member.map((member) =>  <option value= {member._id} key={member._id} > {member.name}({member.role})</option>)
                    }
                </select>
                </div>
                <div>
                <span >Please choose the team members</span>
                <select name="members" className="form-select w-100" onChange = {this.handleChange} multiple>

                    {
                       this.props.member.map((member) =>  {
                           if(!!this.state.members) {
                               if(this.state.members.includes(member._id)){
                                return <option value= {member._id} key={member._id} selected > {member.name}({member.role})</option>
                               }
                           }
                           return <option value= {member._id || ''} key={member._id} > {member.name}({member.role})</option>
                       })
                    }
                </select>
                <span >Please choose the academic supervisor</span>
                <select name="supervisor" className="form-select w-100" onChange = {this.handleChange} multiple>

                    {
                       this.props.member.filter((e) => e.role === 'Professor').map((member) =>  {
                           if(!!this.state.supervisor) {
                               if(this.state.supervisor.includes(member._id)){
                                return <option value= {member._id} key={member._id} selected > {member.name}({member.role})</option>
                               }
                           }
                           return <option value= {member._id || ''} key={member._id} > {member.name}({member.role})</option>
                       })
                    }
                </select>
                </div>

                <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" name="isFeatured" 
                    value='true' 
                    checked= {this.state.isFeatured}
                    onChange = {this.handleChange} 
                    /> 
                
                {/* {
                    this.state.isFeatured === true ? 
                    <input className="form-check-input" type="checkbox" name="isFeatured" 
                    value='true' 
                    defaultChecked
                    onChange = {this.handleChange} 
                    /> : 
                     <input className="form-check-input" type="checkbox" name="isFeatured" 
                                                                        value='true' 
                                                                        onChange = {this.handleChange} 
                                                                        />
                }
                */}
                <label className="form-check-label" htmlFor="isFeatured">
                    Do you want the project presented in the main page carousel?
                </label>
                </div>
                <div className="w-25 h-25">
                  {typeof(this.state.cover)==='string' ? <img  src= {this.state.cover} className="card-img-top w-100" alt="no cover" /> :
                    <img  src= {this.state.uploadimg} className="card-img-top w-100" alt="please choose a cover" />
                  }
                  {/* <img  src= {this.state.img} className="card-img-top w-100" alt={this.state.uploadimg} /> */}
                </div>
                
                <div>
                <label htmlFor="image">Upload Cover Image</label>
                <input onChange = {this.handleChange} type="file" id="image"
                       name="cover"  accept="image/png, image/jpeg" />
                 </div>
                
                 <div className={classnames("col-auto mt-3")}>
                    <button type="submit"  className={classnames("btn btn-primary mb-3")}>submit</button>
                </div>      
           </form>

        )
        return (
            <div>
                {
                    !!this.state.done ? <Redirect to="/Project" /> : form
                 }        
             </div>
           
     );
  }
};

const mapStatetoprops = (state,props) => {
    
      return { 
          project: state.project,
          member: state.member,
          partner:state.partner,
          resource : state.resource
    };


};

ProjectForm.propTpyes = {
    form:PropTpyes.array.isRequired,
    project: PropTpyes.array.isRequired,
    member: PropTpyes.array.isRequired,
    partner: PropTpyes.array.isRequired,
    resource: PropTpyes.array.isRequired,
    fetchMember: PropTpyes.func.isRequired,
    fetchProject: PropTpyes.func.isRequired,
    saveProject: PropTpyes.func.isRequired,
    putProject: PropTpyes.func.isRequired,
    fetchPartner:PropTpyes.func.isRequired,
    fetchResource: PropTpyes.func.isRequired

}

 
export default connect(mapStatetoprops, {saveProject, fetchPJDtails, putProject, fetchMember,fetchPartner, fetchResource}) (ProjectForm); 