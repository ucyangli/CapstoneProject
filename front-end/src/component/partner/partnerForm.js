import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import {savePartner, putPartner, fetchPNDtails} from '../../actions/partner';
import {Redirect} from 'react-router-dom';

class PartnerForm extends React.Component {

    state = {
        _id: this.props.partner ? this.props.partner._id : '',
        name: this.props.partner ? this.props.partner.name : '',
        brief: this.props.partner ? this.props.partner.brief :'',
        pic: this.props.partner ? this.props.partner.pic :'',
        uploadimg:'',
        errors: {},
        loading: false,
        done: false,
    };
    
    componentDidMount() {

        if(this.props.match.url.includes('/edit')) {
            this.props.fetchPNDtails(this.props.match.params.id)
            .then(() => {
                this.setState({
                    _id: this.props.partner._id,
                    brief: this.props.partner.brief,
                    name:  this.props.partner.name,
                    pic: '/'+ this.props.partner.pic,
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
        if(e.target.name === 'pic' ){
            let file = e.target.files[0];
            if(file.zie > 2*1024*1024) {
                alert('oversize pic, please choose another',3)
            }else {
                this.setState({pic: file})
                const imgurl = URL.createObjectURL(file);
                this.setState({
                    uploadimg:imgurl
                })
                }
         }else {
            this.setState({[e.target.name]: e.target.value});
         }

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
            this.setState({loading: true});    

            console.log(this.form.isFeatured);
            let save = async  () => {
                return this.props.savePartner(form)
            }
            let update = async  () => {
                return this.props.putPartner(form)
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
                        onChange = {this.handleChange} /> 
                 </div>

                <div className="w-25 h-25">
                  {typeof(this.state.pic)==='string' ? <img  src= {this.state.pic} className="card-img-top w-100" alt="no pic" /> :
                    <img  src= {this.state.uploadimg} className="card-img-top w-100" alt="please choose a cover" />
                  }
                </div>
                
                <div>
                <label htmlFor="image">Upload Image</label>
                <input onChange = {this.handleChange} type="file" id="image"
                       name="pic"  accept="image/png, image/jpeg" />
                 </div>
                 
                 <div className={classnames("col-auto mt-3")}>
                    <button type="submit"  className={classnames("btn btn-primary mb-3")}>submit</button>
                </div>
                 
           </form>

        )
        return (
            <div>
                {
                    !!this.state.done ? <Redirect to="/Partner" /> : form
                 }        
             </div>

           
     );
  }
};

const mapStatetoprops = (state,props) => {
    
      return { 
          partner: state.partner,
    };
};

PartnerForm.propTpyes = {
    partner: PropTpyes.array.isRequired,
    fetchPartner: PropTpyes.func.isRequired,
    savePartner: PropTpyes.func.isRequired,
    putPartner: PropTpyes.func.isRequired,

}

 
export default connect(mapStatetoprops, {savePartner, fetchPNDtails, putPartner}) (PartnerForm);