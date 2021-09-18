import { useEffect, useState, ChangeEvent, useRef } from "react";

import "./App.css";
import "leaflet/dist/leaflet.css";

import {
  FormControl,
  MenuItem,
  Select,
  Avatar,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";

interface CountryInfo {
  todayCases?: number;
  todayRecovered?: number;
  todayDeaths?: number;
  cases?: number;
  recovered?: number;
  deaths?: number;
}

interface CountriesInterface {
  country: string;
  cases: number;
  deaths: number;
  recovered: number;
  countryInfo: any;
}

function App() {
  const covid_countries_URL = "https://disease.sh/v3/covid-19/countries";
  const worldwide_data_URL = "https://disease.sh/v3/covid-19/all";
  const default_flag_URL =
    "https://www.worldatlas.com/r/w960-q80/upload/d8/98/26/asia-map.png";
  const [countries, setCountries] = useState<CountriesInterface[]>([]);
  const [country, setCountry] = useState("WW");
  const [flagUrl, setFlagUrl] = useState(default_flag_URL);
  const [countryInfo, setCountryInfo] = useState<CountryInfo>({});
  const [mapCenter, setMapCenter] = useState([10, 8]);
  const [mapZoom, setMapZoom] = useState(3);

  //useEffect to get countries
  useEffect(() => {
    fetch(covid_countries_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountries(
          data
            .map((countryData: { [k: string]: any }) => {
              console.log(countryData.countryInfo);
              return {
                country: countryData.country,
                cases: countryData.cases,
                deaths: countryData.deaths,
                recovered: countryData.recovered,
                countryInfo: { ...countryData.countryInfo },
              };
            })
            .sort(
              (countryA: CountriesInterface, countryB: CountriesInterface) =>
                +countryB.cases - +countryA.cases
            )
        );
      })
      .catch((err) =>
        alert("Unable to get data from api, please try again later.")
      );

    //get data for worldwide
    fetch(worldwide_data_URL)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      })
      .catch((err) => {
        alert(`Unable to get ${country} data`);
      });
  }, []);

  const handleCountry = async (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    setCountry(event.target.value as string);
    //GET DATA FOR THE SELECTED COUNTRY
    const url =
      event.target.value === "WW"
        ? worldwide_data_URL
        : `${covid_countries_URL}/${event.target.value}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //set country info
        setCountryInfo(data);
        //set the longitude and latitude of map
        const latLong = [data.countryInfo.lat, data.countryInfo.long];
        // alert(latLong);
        setMapCenter(latLong);
        setMapZoom(4);
      })
      .catch((err) => {
        alert(`Unable to get ${country} data`);
      });
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <div className="app__rightHeader">
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                value={country}
                onChange={handleCountry}
              >
                {/* default value */}
                <MenuItem value="WW">Worldwide</MenuItem>
                {countries.map((country, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={country.countryInfo.iso2}
                      onClick={() => setFlagUrl(country.countryInfo.flag)}
                    >
                      {country.country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Avatar
              src={country === "WW" ? default_flag_URL : flagUrl}
              alt="flag image"
            />
          </div>
        </div>{" "}
        {/*End of header */}
        <div className="app__stats">
          <InfoBox
            title="Corona Cases"
            cases={`${countryInfo.todayCases} cases`}
            total={`${countryInfo.cases} total`}
          />
          <InfoBox
            title="Recovered"
            cases={`${countryInfo.todayRecovered} recovered`}
            total={`${countryInfo.recovered} total`}
          />
          <InfoBox
            title="Deaths"
            cases={`${countryInfo.todayDeaths} deaths`}
            total={`${countryInfo.deaths} total`}
          />
        </div>
        <div className="app__map">
          <Map center={mapCenter} zoom={mapZoom} countries={countries} />
        </div>
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={countries} />
          <h3>Worldwide new cases</h3>
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
