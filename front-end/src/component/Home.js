import React from 'react';



class Home extends React.Component {

    exportData = () => {
       fetch('/api/export')
       .then (res => {alert('data has been updated: ' + res.ok)})

    }
   
   importData = () => {
       fetch('/api/import')
       .then (res => res.json()
                .then((json) => {
                alert(json.message);
                })

       )
   }

    render() {
        return (
            <div>
                <p>Welcome to the lab web portal management platform.</p>
                <p><a className="mt-3 btn btn-primary" onClick={()=> {this.importData()}}>import data（！！！only click it when you first load the application）</a></p>
                <p><a className="mt-3 btn btn-primary" onClick={()=> {this.exportData()}}>export data from the backend to the front end</a></p>
            </div>
            
     );
  }
}

export default Home;