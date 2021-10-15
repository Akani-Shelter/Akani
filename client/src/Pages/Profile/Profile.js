import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Avatar, AppBar} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import ModalComp from "../../components/Modal/Modal";
import SweetAlert from "react-bootstrap-sweetalert";

const Profile = (props) => {
  const history = useHistory();
  const [showSweetAlert, setShowSweetAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [show, setShow] = useState(false);
  const modalText = "Are you sure you want to delete your account?";
  const [accDelete, setAccDelete] = useState(false);

  let userReq = {
    email: localStorage.getItem("emailSession"),
  };

  const deleteAccount = (email) => {
    email = { email: localStorage.getItem("emailSession") };
    if (email !== "undefined") {
      axios
        .post("http://localhost:8080/user/deleteUserAccount/", email)
        .then((response) => {})
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("Email is not defined");
    }
    setShow(true);
  };

  const onCancel = (e) => {
    setShow(false);
  };
  const OnContinue = () => {
    setAccDelete(true);
    setAlertTitle("Account deleted");
    setShowSweetAlert(true);
    history.push("/login");
  };

  return (
    <React.Fragment>
      <ModalComp
        show={show}
        text={modalText}
        cancel={onCancel}
        continue={OnContinue}
      />
      <SweetAlert
        show={showSweetAlert}
        success
        title={alertTitle}
        onConfirm={() => {
          setShowSweetAlert(false);
          if (accDelete) {
            history.push("/login");
            localStorage.clear();
          }
        }}
      />
      <Sidebar />
      <div className="md:ml-64" style={{ fontFamily: "Nunito" }}>
        <div className="container">
          <Container>
            <div
              className="row pb-5 pt-3"
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 1px",
                borderBottom: "1px solid grey",
                backgroundColor: "#cbd5e1",
                borderRadius: "8px",
              }}
            >
              <div>
                <Avatar
                  variant={"rounded"}
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  className="aV"
                  src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
                />
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h4>{userReq.email}</h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                </div>

                <div style={{ display: "flex", bottom: "-30px" }}>
                  <Link
                    className={
                      "text-xs lowercase py-3 font-bold" +
                      (window.location.href.indexOf("/updateProfile") !== -1
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                    to="/updateProfile"
                    style={{ display: "flex", font: "verdana" }}
                  >
                    <i
                      className={
                        "fas fa-User-Edit mr-2 text-sm " +
                        (window.location.href.indexOf("/updateProfile") !== -1
                          ? "opacity-75"
                          : "text-blueGray-300")
                      }
                    />{" "}
                    <Button
                      variant={"contained"}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#58667e",
                        color: "#FFFFF0",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        outline: "5px",
                        width: "100%",
                      }}
                      startIcon={<EditIcon fontSize={"large"} />}
                    >
                      Update Profile Details
                    </Button>
                  </Link>
                  <div className="flex text-xs py-3 ml-3">
                    <Button
                      variant={"contained"}
                      style={{
                        textAlign: "center",
                        backgroundColor: "#58667e",
                        color: "#FFFFF0",
                        padding: "5px 15px",
                        borderRadius: "5px",
                        outline: "5px",
                        width: "150%",
                      }}
                      onClick={() => {
                        deleteAccount(userReq);
                      }}
                      startIcon={<DeleteIcon />}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <AppBar
            position={"static"}
            color={"transparent"}
            style={{ borderRadius: "5px" }}
          >
          </AppBar>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Profile;
