import React from "react";
import Zoom from "react-medium-image-zoom";

const Detail = () => {
  const image_url = [
    {
      id: "1",
      url: "../dist/img/insecticide/Pic_1.png",
    },
    {
      id: "2",
      url: "../dist/img/insecticide/Pic_2.png",
    },
    {
      id: "3",
      url: "../dist/img/insecticide/Pic_3.png",
    },
    {
      id: "4",
      url: "../dist/img/insecticide/Pic_4.png",
    },
    {
      id: "5",
      url: "../dist/img/insecticide/Pic_5.png",
    },
    {
      id: "6",
      url: "../dist/img/insecticide/Pic_6.png",
    },
    {
      id: "7",
      url: "../dist/img/insecticide/Pic_7.png",
    },
    {
      id: "8",
      url: "../dist/img/insecticide/Pic_8.png",
    },
    {
      id: "9",
      url: "../dist/img/insecticide/Pic_9.png",
    },
  ];

  return (
    <div className="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12"></div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card card-success">
                <div class="card-header" style={{ backgroundColor: "#8CC152" }}>
                  <center>
                    <h3 class="card-title">
                      คำแนะนำ การใช้สารป้องกันและกำจัดโรคพืช (กะเพรา,โหระพา)
                      ฤดูกาล 2564/2565
                    </h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {image_url.map((data) => (
                      <div class="col-sm-2" key={data.id}>
                        <Zoom>
                          <img
                            src={data.url}
                            class="img-fluid mb-2"
                            alt="white sample"
                          />
                        </Zoom>
                      </div>
                    ))}
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

export default Detail;
