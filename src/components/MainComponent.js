import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import axios from "axios";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

function MainComponent() {
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [dates, setDates] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hosts, setHosts] = useState(null);
  const [selectedHost, setSelectedHost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/clientIp/values`)
      .then((res) => {
        setClients(res.data.data.map((x) => x?.clientIp));
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5001/creation_date/values`)
      .then((res) => {
        setDates(res.data.data.map((x) => x?.creation_date));
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:5001/hostName/values`)
      .then((res) => {
        setHosts(res.data.data.map((x) => x?.hostName));
      })
      .catch((err) => console.log(err));
  }, []);

  const selectClientHandler = (e) => {
    setSelectedClient(e.target.value);
  };

  const selectDateHandler = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectHostHandler = (e) => {
    setSelectedHost(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          padding: "15px 0 15px 0",
          textAlign: "center",
          width: "100%",
          backgroundColor: "#171b22",
          color: "#eff2fa",
        }}
      >
        The information given in the CSV file can be summarazied using the
        following graphs.
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "15%",
            minHeight: "100vh",
            backgroundColor: "#0c1016",
          }}
        >
          <div style={{ width: "90%", margin: "5%" }}>
            <div style={{ color: "#c8d1da" }}>Select Client</div>
            <select
              style={{
                width: "100%",
                color: "#e0f3e6",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor: "#009231",
              }}
              name="clients"
              id="clients"
              onChange={selectClientHandler}
            >
              <option value="" selected disabled hidden>
                Select
              </option>

              {clients &&
                clients.map((item, index) => (
                  <option
                    style={{
                      borderRadius: "5px",
                      color: "#009231",
                      backgroundColor: "#e0f3e6",
                    }}
                    value={item}
                    key={index}
                  >
                    {item}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ marginTop: "20px", width: "90%", margin: "5%" }}>
            <div style={{ color: "#c8d1da" }}>Select Date</div>
            <select
              style={{
                width: "100%",
                color: "#e0f3e6",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor: "#009231",
              }}
              name="dates"
              id="dates"
              onChange={selectDateHandler}
            >
              <option value="" selected disabled hidden>
                Select
              </option>
              {dates &&
                dates.map((item, index) => (
                  <option
                    style={{
                      borderRadius: "5px",
                      color: "#009231",
                      backgroundColor: "#e0f3e6",
                    }}
                    value={item}
                    key={index}
                  >
                    {item}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ margin: "5%", marginTop: "100px", width: "90%" }}>
            <div style={{ color: "#c8d1da" }}>Select Application</div>
            <select
              style={{
                width: "100%",
                color: "#e0f3e6",
                borderRadius: "5px",
                padding: "5px",
                backgroundColor: "#009231",
              }}
              name="clients"
              id="clients"
              onChange={selectHostHandler}
            >
              <option value="" selected disabled hidden>
                Select
              </option>

              {hosts &&
                hosts.map((item, index) => (
                  <option
                    style={{
                      borderRadius: "5px",
                      color: "#009231",
                      backgroundColor: "#e0f3e6",
                    }}
                    value={item}
                    key={index}
                  >
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div
          style={{ width: "85%", padding: "10px 0 0 20px", color: "#767e89" }}
        >
          {!selectedClient || !selectedDate ? (
            <div
              style={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              No Data to Show
            </div>
          ) : (
            <></>
          )}
          <div>
            {selectedClient && selectedDate ? (
              <span>
                These pie charts represent the information about usage
                statistics of all applications for the selected CLIENT and DATE.
              </span>
            ) : (
              <></>
            )}
            <div
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              {selectedClient && selectedDate ? (
                <Chart1
                  selectedClient={selectedClient}
                  selectedDate={selectedDate}
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div style={{ marginTop: "50px" }}>
            {selectedClient && selectedDate && selectedHost ? (
              <span>
                This Line graph represents the information about usage
                statistics of individual applications throughout a day for
                selected CLIENT and DATE.
              </span>
            ) : (
              <></>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "10px",
              }}
            >
              {selectedClient && selectedDate && selectedHost ? (
                <Chart2
                  selectedClient={selectedClient}
                  selectedDate={selectedDate}
                  selectedHost={selectedHost}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
