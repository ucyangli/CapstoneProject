import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (

                <div className="footer">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-contact">
                        <h2>University of Canberra </h2>
                        <p><i className="fa fa-map-marker-alt" /><a href='https://www.canberra.edu.au/'>https://www.canberra.edu.au/</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-link">
                        <h2>Lab Address</h2>
                        <p><i className="fa fa-map-marker-alt" />6B21, 11 Kirinari St, Bruce ACT 2617</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-link">
                        <h2>Contact</h2>
                        <p><i className="fa fa-phone-alt" />Damith Herath</p>
                        <p><i className="fa fa-envelope" />damith.herath@uni.canberra.edu.au</p>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div className="copyright container">
                    <div className="row">
                    <div className="col-md-6">
                        <p>©<a href="/">UC Colaborative Robotic Laboratory</a>, All Right Reserved.</p>
                    </div>
                    <div className="col-md-6">
                        <p>Designed By <a href="/">Yang</a></p>
                    </div>
                    </div>
                    </div>
                </div>

        )
    }
}
