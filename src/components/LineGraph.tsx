import React, { FC, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

//cases,deaths,recovered
interface DataInterface {
  cases?: { [k: string]: number };
  deaths?: { [k: string]: number };
  recovered?: { [k: string]: number };
}

const LineGraph: FC = () => {
  const covid_history_URL =
    "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
  const [data, setData] = useState<DataInterface>({});
  return <div>{/* <Line data option /> */}</div>;
};

export default LineGraph;
