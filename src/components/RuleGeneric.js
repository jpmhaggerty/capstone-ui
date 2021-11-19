import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ModalGeneric from "./ModalGeneric.js";
import Typography from "@mui/material/Typography";

export default function RuleGeneric({criteria}) {
  const infoFromDatabase = {
    ruleName: "lightning",
    llccFlightPathRadius: 10,
    llccStrikeTimeDelay: 30,
    llccMaxCloudDistToFlightPath: 10,
    strikeTime: Date.now() - 6 * 60 * 60 * 1000,
    strikeDistToFlightPath: 25,
    cloudDistToFlightPath: false,
    strikeDistNearFieldMill: false,
    fieldStrengthLow: false,
  };
  console.log(criteria);

  const [open, setOpen] = React.useState(false);
  const [ruleSet, setRuleSet] = React.useState(infoFromDatabase);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleDataSet = (name, value) => {
    setRuleSet({ ...ruleSet, [name]: value });
  };

  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  const showByClass = (name, show) => {
    let classArray = document.getElementsByClassName(name);
    if (classArray) {
      for (let i = 0; i < classArray.length; i++) {
        classArray[i].removeAttribute("hidden");
      }
    }
    if (classArray && !show) {
      for (let i = 0; i < classArray.length; i++) {
        classArray[i].setAttribute("hidden", "true");
      }
    }
  };

  React.useEffect(() => {
    //place card logic here.. module should return pass/ fail (i.e. true/ false) boolean
    //module should also reveal exception-based sections as appropriate
    //module should make provisions for resetting exceptions if they are not required for eval
    const isRuleClear = () => {
      showByClass("exception", false);
      let rule1 = ruleSet.strikeDistToFlightPath > ruleSet.llccFlightPathRadius;
      let rule2 =
        (Date.now() - ruleSet.strikeTime) / (1000 * 60) >
        ruleSet.llccStrikeTimeDelay;
      let except1 =
        ruleSet.cloudDistToFlightPath &&
        ruleSet.strikeDistNearFieldMill &&
        ruleSet.fieldStrengthLow;

      showByClass("exception", !(rule1 || rule2));
      return rule1 || rule2 || except1;
    };

    setClearToLaunch(isRuleClear());
  }, [ruleSet]);

  return (
    <div>
      <Card
        data-testid="card"
        sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
            {properCase(ruleSet.ruleName)} Rule
          </Typography>
          <Typography variant="h5" component="div">
            {clearToLaunch ? "Clear" : "Violation"}
          </Typography>
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt="ruleSet image link"
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* parameter title & parameter value */}
            Strike distance to flight path: {ruleSet.strikeDistToFlightPath}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {/* parameter title & parameter value */}
            Time of last strike:{" "}
            {ruleSet.strikeTime ?? false ? Date(ruleSet.strikeTime) : "N/A"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleModal()}>
            Change Rule Data
          </Button>
        </CardActions>
      </Card>
      <ModalGeneric
        open={open}
        ruleSet={ruleSet}
        handleModal={handleModal}
        handleDataSet={handleDataSet}
      />
    </div>
  );
}
