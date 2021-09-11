import { FC } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../css/infoBox.css";

interface Props {
  title: string;
  cases: string;
  total: string;
}

const InfoBox: FC<Props> = ({ title, cases, total }) => {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography color="textSecondary" className="infoBox__title">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{cases}</h2>
          <Typography color="textSecondary" className="infoBox__total">
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
