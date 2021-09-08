import React, { FC } from "react";
import "../css/table.css";

interface Countries {
  country?: string;
  iso?: string;
  cases?: string;
}

interface Prop {
  countries: Countries[];
}
const Table: FC<Prop> = ({ countries }) => {
  return (
    <div className="table">
      <table>
        {countries.map(({ country, cases }) => {
          return (
            <tr className="table__tr">
              <td>{country}</td>
              <td>
                <strong>{cases}</strong>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
