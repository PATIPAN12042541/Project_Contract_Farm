import React from "react";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-12"></div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div class="card-header" style={{ backgroundColor: "#8CC152" }}>
                  <center>
                    <h3 class="card-title">แปลงปลูกผัก</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-6 col-xl-4">
                      <div className="card mb-2 bg-gradient-dark">
                        <img
                          className="card-img-top"
                          src="../dist/img/holy_basil.jpg"
                          alt="Dist Photo 1"
                          width={250}
                          height={300}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                          <h1 className="card-title text-primary text-white">
                            Plant A1
                          </h1>
                          <p className="card-text text-white pb-3 pt-1">
                            ปลูกกระเพรา
                          </p>
                          <Link to="/Data_detail" className="text-white">
                            Click Me
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-4">
                      <div className="card mb-2 bg-gradient-dark">
                        <img
                          className="card-img-top"
                          src="../dist/img/cili.jpg"
                          alt="Dist Photo 2"
                          width={250}
                          height={300}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                          <h1 className="card-title text-primary text-white">
                            Plant A2
                          </h1>
                          <p className="card-text text-white pb-3 pt-1">
                            ปลูกพริก
                          </p>
                          <Link to="/Data_detail" className="text-white">
                            Click Me
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-4">
                      <div className="card mb-2 bg-gradient-dark">
                        <img
                          className="card-img-top"
                          src="../dist/img/Thai-Eggplant-2.jpg"
                          alt="Dist Photo 3"
                          width={250}
                          height={300}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                          <h1 className="card-title text-primary text-white">
                            Plant A3
                          </h1>
                          <p className="card-text text-white pb-3 pt-1">
                            ปลูกเขือ
                          </p>
                          <Link to="/Data_detail" className="text-white">
                            Click Me
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-4">
                      <div className="card mb-2 bg-gradient-dark">
                        <img
                          className="card-img-top"
                          src="../dist/img/images2.jpg"
                          alt="Dist Photo 3"
                          width={250}
                          height={300}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                          <h1 className="card-title text-primary text-white">
                            Plant A4
                          </h1>
                          <p className="card-text text-white pb-3 pt-1">
                            แตงกวา
                          </p>
                          <Link to="/Data_detail" className="text-white">
                            Click Me
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-4">
                      <div className="card mb-2 bg-gradient-dark">
                        <img
                          className="card-img-top"
                          src="../dist/img/images.jpg"
                          alt="Dist Photo 3"
                          width={250}
                          height={300}
                        />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                          <h1 className="card-title text-primary text-white">
                            Plant A5
                          </h1>
                          <p className="card-text text-white pb-3 pt-1">
                            ผักกาดขาว
                          </p>
                          <Link to="/Data_detail" className="text-white">
                            Click Me
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
