import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function Chart2(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/info/${props.selectedClient}/${props.selectedDate}/${props.selectedHost}`
      )
      .then((res) => {
        var d = res.data.data;
        d = d.sort((p1, p2) => parseInt(p1.time) - parseInt(p2.time));
        setData(d);
      })
      .catch((err) => console.log(err));
  }, [props]);

  const chartData1 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: data && data.map((x) => x?.time),
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 2,
      },
      yaxis: {
        show: true,
        title:{
          text: "MegaBytes",
          style: {
            color: "#fff"
          }
        },
      },
      xaxis: {
        show: true,
        title: {
          text: "Hour Of Day",
          style: {
            color: '#fff'
          },
          offsetY: 80
        },

      }
    },
    series: [
      {
        name: "download",
        data: data && data.map((x) => x?.download / 1000000),
      },
      {
        name: "upload",
        data: data && data.map((x) => x?.upload / 1000000),
      },
    ],
  };

  const chartData2 = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: data && data.map((x) => x?.time),
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 2,
      },
      yaxis: {
        show: true,
        title:{
          text: "Seconds",
          style: {
            color: "#fff"
          }
        },
      },
      xaxis: {
        show: true,
        title: {
          text: "Hour Of Day",
          style: {
            color: '#fff'
          },
          offsetY: 80
        },

      }
    },
    series: [
      {
        name: "seconds",
        data: data && data.map((x) => x?.usageSeconds),
      },
    ],
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
      {chartData1.options ? (
        <>
        <Chart
          options={chartData1?.options}
          series={chartData1?.series}
          type="line"
          width="400"
        />
        <Chart
          options={chartData2?.options}
          series={chartData2?.series}
          type="line"
          width="400"
        />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Chart2;
