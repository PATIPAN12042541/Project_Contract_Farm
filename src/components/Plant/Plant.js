import React from "react";

const Plant = (props) => {

 const [datadetail, setDatadetail] = useState([]);

 const getPlantData = async () => {
   const response = await axios.get(
     `${process.env.REACT_APP_API_URL}/zoneplant/plant/${props.id}`
   );
   setDatadetail(response.data);
   console.log(response.data);
 };

 useEffect(() => {
   getPlantData();
 }, []);
    

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
                <div
                  className="card-header"
                  style={{ backgroundColor: "#8CC152" }}
                >
                  <center>
                    <h3 className="card-title">แปลงเพาะปลูก</h3>
                  </center>
                </div>
                <div className="card-body">
                  <div className="row">

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

export default Plant;
