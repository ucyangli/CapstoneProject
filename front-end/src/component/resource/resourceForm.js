import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import {saveResource, putResource, fetchRSDtails} from '../../actions/resource';
import {Redirect} from 'react-router-dom';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState,convertToRaw,convertFromRaw } from 'draft-js';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ResourceForm extends React.Component {

    state = {
        _id: this.props.resource ? this.props.resource._id : '',
        name: this.props.resource ? this.props.resource.name : '',
        brief: this.props.resource ? this.props.resource.brief :'',
        detail: this.props.resource ? this.props.resource.detail :'',
        rsimg: this.props.resource ? this.props.resource.rsimg :'',
        editorState: EditorState.createEmpty(),
        uploadimg:'',
        errors: {},
        loading: false,
        done: false,
    };
    
    componentDidMount() {

        if(this.props.match.url.includes('/edit')) {
            this.props.fetchRSDtails(this.props.match.params.id)
            .then(() => {
                let content = convertFromRaw(JSON.parse(this.props.resource.detail));
                this.setState({
                    _id: this.props.resource._id,
                    brief: this.props.resource.brief,
                    detail: this.props.resource.detail,
                    name:  this.props.resource.name,
                    rsimg: '/'+ this.props.resource.rsimg,
                    editorState: EditorState.createWithContent(content)
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
        if(e.constructor.name === 'EditorState'){
            this.setState({
                editorState: e,
              });
          
            this.setState({detail: JSON.stringify(convertToRaw(e.getCurrentContent()))})

        }else if (e.constructor.name === 'SyntheticBaseEvent'){
        if(e.target.name === 'rsimg' ){
            let file = e.target.files[0];
            if(file.zie > 2*1024*1024) {
                alert('oversize pic, please choose another',3)
            }else {
                this.setState({rsimg: file})
                const imgurl = URL.createObjectURL(file);
                this.setState({
                    uploadimg:imgurl
                })
                }
         }else {
            this.setState({[e.target.name]: e.target.value});
         }
        }
    };

    handdleSubmit =  (e) => {
        e.preventDefault();
        let errors = {};
        if(this.state.name === "") errors.name = "can't be empty";
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
                return this.props.saveResource(form)
            }
            let update = async  () => {
                return this.props.putResource(form)
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

                <div className="w-25 h-25">
                  {typeof(this.state.rsimg)==='string' ? <img  src= {this.state.rsimg} className="card-img-top w-100" alt="no pic" /> :
                    <img  src= {this.state.uploadimg} className="card-img-top w-100" alt="please choose an image" />
                  }
                </div>
                
                <div>
                <label htmlFor="image">Upload Image</label>
                <input onChange = {this.handleChange} type="file" id="image"
                       name="rsimg"  accept="image/png, image/jpeg" />
                 </div>
                 
                 <div className={classnames("col-auto mt-3")}>
                    <button type="submit"  className={classnames("btn btn-primary mb-3")}>submit</button>
                </div>
                 
           </form>

        )
        return (
            <div>
                {
                    !!this.state.done ? <Redirect to="/resource" /> : form
                 }        
             </div>

           
     );
  }
};

const mapStatetoprops = (state,props) => {
    
      return { 
          resource: state.resource,
    };
};

ResourceForm.propTpyes = {
    resource: PropTpyes.array.isRequired,
    fetchResource: PropTpyes.func.isRequired,
    saveResource: PropTpyes.func.isRequired,
    putResource: PropTpyes.func.isRequired,

}

 
export default connect(mapStatetoprops, {saveResource, fetchRSDtails, putResource}) (ResourceForm);