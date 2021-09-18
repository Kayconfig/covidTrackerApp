import React, { FC } from "react";
import "../css/table.css";
import numeral from "numeral";

interface Countries {
  country?: string;
  iso?: string;
  cases?: number;
}

interface Prop {
  countries: Countries[];
}
const Table: FC<Prop> = ({ countries }) => {
  return (
    <div className="table__container">
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Cases</th>
          </tr>
        </thead>
        <tbody>
          {countries.map(({ country, cases }) => {
            return (
              <tr className="table__tr">
                <td>{country}</td>
                <td>
                  <strong>
                    {cases !== undefined && cases.toString().length > 3
                      ? numeral(cases).format("0.0a")
                      : cases}
                  </strong>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default Table;
