import React from "react";
import Zoom from "react-medium-image-zoom";
import "./CSS/Detail.css";
import ImageListItemBar from "@mui/material/ImageListItemBar";

const Detail = () => {
  const image_url = [
    {
      id: "1",
      url: "../dist/img/insecticide/พรีวาทอน.png",
      name_chemical: "พรีวาทอน",
      eu_mrl: "20",
    },
    {
      id: "2",
      url: "../dist/img/insecticide/เอ็กซอล.jpg",
      name_chemical: "เอ็กซอล",
      eu_mrl: "4",
    },
    {
      id: "3",
      url: "../dist/img/insecticide/อะบาเเมคติน.png",
      name_chemical: "อะบาเเมกติน",
      eu_mrl: "2",
    },
    {
      id: "4",
      url: "../dist/img/insecticide/Bacillus sustilis.png",
      name_chemical: "Bacillus thuringiensis",
      eu_mrl: "0",
    },
    {
      id: "5",
      url: "../dist/img/insecticide/Azoxystrobin.png  ",
      name_chemical: "อมิสตา",
      eu_mrl: "7",
    },
    {
      id: "6",
      url: "../dist/img/insecticide/Mancozeb.png",
      name_chemical: "แมนโคเซบ",
      eu_mrl: "5",
    },
    {
      id: "7",
      url: "../dist/img/insecticide/Fosetyl-Al.jpg",
      name_chemical: "อาลีเอท",
      eu_mrl: "75",
    },
    {
      id: "8",
      url: "../dist/img/insecticide/DimethomorphEu.jpg",
      name_chemical: "ไดออฟ",
      eu_mrl: "10",
    },
    {
      id: "9",
      url: "../dist/img/insecticide/Bacillus sustilis.png",
      name_chemical: "Bacillus sustillis",
      eu_mrl: "0",
    },
  ];

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
            <div className="col-12">
              <div className="card card-success">
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">
                      คำแนะนำ การใช้สารป้องกันและกำจัดโรคพืช (กะเพรา,โหระพา)
                      ฤดูกาล 2564/2565
                    </h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">
                    {image_url.map((data) => (
                      <div
                        className="col-md-12 col-lg-6 col-xl-3"
                        key={data.id}
                      >
                        <div className="card mb-2 container">
                          <div className="overlay">
                            <div className="name">{data.name_chemical}</div>
                            <div className="eu-mrl">
                              {"Eu-MRL : " + data.eu_mrl}
                            </div>
                          </div>
                          <img
                            className="img-set"
                            src={data.url}
                            width={250}
                            height={300}
                          />
                        </div>
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
