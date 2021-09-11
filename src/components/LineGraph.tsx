import { FC, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import numeral from "numeral";

interface DataInterface {
  casesType: string;
}

const options = {
  legend: {
    display: true,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem: { value: string }) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value: string) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data: { [k: string]: any }, casesType: string) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

const LineGraph: FC<DataInterface> = ({ casesType }) => {
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=20")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          console.log(chartData);
          // buildChart(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    <div className="line__container" style={{ height: "37vh" }}>
      {data?.length > 0 && (
        <Bar
          data={{
            datasets: [
              {
                label: "Cases for Last 20 days",
                backgroundColor: "rgba(204, 16, 52, 0.9)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;
