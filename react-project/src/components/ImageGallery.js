import React from "react";
import Gallery1 from '../utils/img/img5.jpg';
import Gallery2 from '../utils/img/img6.jpg';
import Gallery3 from '../utils/img/img7.jpg';
import Gallery4 from '../utils/img/img10.jpg';
import Gallery5 from '../utils/img/img9.jpg';
import Gallery6 from '../utils/img/img8.jpg';

export function ImageGallery() {
    return (
        <div className="container py-5">
            <h2 className="text-center fs-1 mb-5 text-uppercase fw-bold">Image Gallery</h2>
            <div className="row">
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={Gallery1} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Gallery2} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={Gallery3} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Gallery4} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="col-md-4 px-2">
                    <div className="my-3">
                        <img src={Gallery5} className="img-fluid" alt="" />
                    </div>
                    <div className="my-3">
                        <img src={Gallery6} className="img-fluid" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}