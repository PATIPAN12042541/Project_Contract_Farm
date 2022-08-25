import React,{ useState, useEffect ,useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Pagination from "../Pagination/Pagination.js";
import '../Pagination/style.scss';

let PageSize = 5;

export const List_User = () => {
  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

    const getListUser = async () => {
        /*if (roleid == 1) {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/User/getUsersByDev`
            );
            setListUsers(response.data);
        } else {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/User/getUsersByAdmin`
            );
            setListUsers(response.data);
        }*/
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/User/getUsersByDev`
        );
        setListUsers(response.data);
    };

  // Search Item
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
        const filteredData = listUsers.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData);
        setCurrentPage(1);
        console.log(filteredData);
    }
    else{
        setListUsers(listUsers);
        console.log(listUsers);
    }
}
  
  // Pageing
  const currentTableData = useMemo(() => {
    console.log(currentPage);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    if (searchInput.length > 1){
      return filteredResults.slice(firstPageIndex, lastPageIndex);
    }
    else
    {
      return listUsers.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage,searchInput.length > 1 ? filteredResults : listUsers]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getListUser();
  },[]);
  return (
      <div className="content-wrapper">
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
                                      <h3 className="card-title">ข้อมูลผู้ใช้งานระบบ</h3>
                                  </center>
                              </div>
                              <div className="card-body">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <Button variant="success">
                                              เพิ่มข้อมูลผู้ใช้งานระบบ
                                          </Button>
                                      </div>
                                      <div className="col-md-6">
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="ค้นหา"
                                              onChange={(e) => searchItems(e.target.value)}
                                          />
                                      </div>
                                  </div>
                                  <hr />
                                  <div className="row">
                                      <Table
                                          className="table table-bordered table-hover dataTable dtr-inline"
                                          responsive
                                      >
                                          <thead>
                                              <tr>
                                                  <th>ลำดับ</th>
                                                  <th>ประเภท User</th>
                                                  <th>ชื่อ</th>
                                                  <th>นามสกุล</th>
                                                  <th>แก้ไขข้อมูล</th>
                                                  <th>ลบข้อมูล</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {currentTableData.map((listUsers, index) => (
                                                  <tr key={listUsers.id}>
                                                      <td>{currentPage <= 1 ? index + 1:(index + 1) + PageSize}</td>
                                                      <td>{listUsers.group_name}</td>
                                                      <td>{listUsers.name}</td>
                                                      <td>{listUsers.last_name}</td>
                                                      <td>
                                                          <center>
                                                              <Link to={``}>
                                                                  <Button
                                                                      variant="warning"
                                                                      style={{ color: "#ffff" }}
                                                                  >
                                                                    <AiFillEdit />
                                                                  </Button>
                                                              </Link>
                                                          </center>
                                                      </td>
                                                      <td>
                                                          <center>
                                                              <Button
                                                                  variant="danger"
                                                              >
                                                                <BsTrashFill />
                                                              </Button>
                                                          </center>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </Table>
                                      <Pagination
                                          className="pagination-bar"
                                          currentPage={currentPage}
                                          totalCount={
                                              searchInput.length > 1
                                                  ? filteredResults.length
                                                  : listUsers.length
                                          }
                                          pageSize={PageSize}
                                          onPageChange={(page) => setCurrentPage(page)}
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  )
}
