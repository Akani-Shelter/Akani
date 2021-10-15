import "./Notifications.css";
import "react-day-picker/lib/style.css";
import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import Hyperlink from "react-native-hyperlink";
import { Text } from "react-native";
import Sidebar from "../../components/Sidebar/Sidebar";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";

const filterOptions = ["Read", "Unread", "Latest", "Oldest"];

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elem: [],
      notificationObject: {},
      emailRequest: {},
      clear: false,
      _delete: false,
      refresh: false,
      unread: 0,
      read_checked: false,
      unread_checked: false,
      newest_checked: false,
      oldest_checked: false,
      og_list: [],
      list: [],
      temp_list: [],
      ids: [],
    };
    this.dateFrom = Date.now();
    this.dateTo = Date.now();
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (e) => {
    if (e.target.value === "Read") {
      this.state.read_checked = !this.state.read_checked;
      let filtered = [];
      if (this.state.read_checked) {
        filtered = this.state.og_list.filter((element) => {
          return element.read;
        });

        if (this.state.temp_list.length > 0) {
          filtered.push(...this.state.temp_list);
          this.setState({ list: filtered }); //add to the list not replace
        } else {
          this.setState({ list: filtered, temp_list: filtered });
        }
      } else {
        filtered = this.state.list.filter((element) => {
          return !element.read;
        });

        if (filtered.length > 1) {
          this.setState({ list: filtered, temp_list: filtered });
        } else {
          this.setState({ list: this.state.og_list, temp_list: [] });
        }
      }
    } else if (e.target.value === "Unread") {
      this.state.unread_checked = !this.state.unread_checked;
      let filtered = [];
      if (this.state.unread_checked) {
        filtered = this.state.og_list.filter((element) => {
          return !element.read;
        });
        if (this.state.temp_list.length > 0) {
          filtered.push(...this.state.temp_list);
          this.setState({ list: filtered });
        } else {
          this.setState({ list: filtered, temp_list: filtered });
        }
      } else {
        filtered = this.state.list.filter((element) => {
          return element.read;
        });
        if (filtered.length > 1) {
          this.setState({ list: filtered, temp_list: filtered });
        } else {
          this.setState({ list: this.state.og_list, temp_list: [] });
        }
      }
    } else if (e.target.value === "Latest") {
      this.state.newest_checked = !this.state.newest_checked;
    } else if (e.target.value === "Oldest") {
      this.state.oldest_checked = !this.state.oldest_checked;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar unread={this.state.unread} />
        <div className="md:ml-64">
          <Container className="mt-3" fluid>
            <Card>
              <Card.Header>
                <button
                  type="button"
                  className="text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0 float-right"
                >
                  <i className="fas fa-trash-alt"></i>&nbsp;Clear all
                  Notifications
                </button>
              </Card.Header>
              <Card.Body style={{ height: "50%" }}>
                <Row>
                  <div
                    className="col-md-4"
                    style={{ borderRight: "1px solid #c1c1c1" }}
                  >
                    <p className="text-blueGray-600 mr-0 mt-1 ml-2 text-sm uppercase font-bold px-0">
                      Filter &amp; refine
                    </p>
                    {filterOptions.map((element) => {
                      return (
                        <div>
                          <Checkbox
                            value={element}
                            onChange={this.handleSelect}
                            style={{ color: "#03989e", marginRight: 0 }}
                          />
                          <span className="text-blueGray-600 mr-0 mt-1 ml-2 text-md  px-0">
                            View <strong>{element}</strong> notifications
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-md-8">
                    <div className="row grid-15-gutter">
                      {this.state.list.map((obj, index) => {
                        return (
                          <div className="col-md-6" key={index}>
                            {obj.read ? (
                              <div className="card panel-read">
                                <div className="toast-header">
                                  <small>
                                    {moment(obj.time).format(
                                      "DD/MM/YYYY HH:mm"
                                    )}
                                  </small>
                                  <button
                                    type="button"
                                    value={obj.time}
                                    className="ml-2 mb-1 close"
                                    data-dismiss="toast"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="media-body">
                                  <Hyperlink linkDefault={true}>
                                    <Text>{obj.content}</Text>
                                  </Hyperlink>
                                </div>
                              </div>
                            ) : (
                              <div className="card panel-unread">
                                <div className="toast-header">
                                  <small>
                                    {moment(obj.time).format(
                                      "DD/MM/YYYY HH:mm"
                                    )}
                                  </small>
                                  <button
                                    type="button"
                                    value={obj.time}
                                    className="ml-2 mb-1 close"
                                    data-dismiss="toast"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="media-body">
                                  <Hyperlink linkDefault={true}>
                                    <Text>{obj.content}</Text>
                                  </Hyperlink>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Notifications;
