import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const Single = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path)

  const [details, setDetails] = useState([]);
  const { data, loading, error } = useFetch(path);
   
  useEffect(() => {
    setDetails(data);
  }, [data]);

console.log(details)
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={details.img?details.img:details.photos?.[0]}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{details.username?details.username:details.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">{details.email?"Email:":"Address"}</span>
                  <span className="itemValue">{details.email?details.username:details.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{details.phone?"Phone:":"Type:"}</span>
                  <span className="itemValue">{details.phone?details.phone:details.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">
                  {details.city}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{details.country?"Country:":"Rating:"}</span>
                  <span className="itemValue">{details.country?details.country:details.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
