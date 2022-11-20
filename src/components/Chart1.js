import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function Chart1(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/info/${props.selectedClient}/${props.selectedDate}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const downloadArr = data && data.map((x) => x?.download / 1000000);
  const uploadArr = data && data.map((x) => x?.upload / 1000000);
  const usageSecondsArr = data && data.map((x) => x?.usageSeconds);
  const hostArr = data && data.map((x) => x?.hostName);

  const pie1 = {
    options: {
      legend: { show: false },
      labels: hostArr,
    },
    series: downloadArr,
  };

  const pie2 = {
    options: {
      legend: { show: false },
      labels: hostArr,
    },
    series: uploadArr,
  };

  const pie3 = {
    options: {
      legend: { show: false, position: "bottom", offsetY: 20 },
      labels: hostArr,
    },
    series: usageSecondsArr,
  };

  const pie4 = {
    options: {
      legend: { show: true },
      labels: hostArr,
    },
    series: usageSecondsArr,
  };

  return (
    <>
      {data && (
        <div
          style={{
            overFlowX: "scroll",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div>
            <Chart
              options={pie1?.options}
              series={pie1?.series}
              type="pie"
              width="300"
            />
            <div style={{ textAlign: "center" }}>Downloads (mb)</div>
          </div>
          <div>
            <Chart
              options={pie2?.options}
              series={pie2?.series}
              type="pie"
              width="300"
            />
            <div style={{ textAlign: "center" }}>Uploads (mb)</div>
          </div>
          <div>
            <Chart
              options={pie3?.options}
              series={pie3?.series}
              type="pie"
              width="300"
            />
            <div style={{ textAlign: "center" }}>Usage (seconds)</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chart1;
