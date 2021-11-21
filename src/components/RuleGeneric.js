import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ModalGeneric from "./ModalGeneric.js";
import Typography from "@mui/material/Typography";
import fetch from "cross-fetch";

export default function RuleGeneric({ ruleName }) {
  const stubData = {
  "id": 10,
  "constraint_name": "",
  "constraint_parameter_integer": 0,
  "constraint_parameter_boolean": false,
  "user_input_integer": 0,
  "user_input_boolean": false
  };

  const getAPIData = async (ruleName) => {
    const response = await fetch(`http://localhost:8080/rules/${ruleName}`);
    const result = await response.json();
    setRule(result);
  };

  const putAPIData = async (ruleName) => {
    console.log("Put request content: ", rule)
    for (let i = 0; i < rule.length; i++) {
      const response = await fetch(`http://localhost:8080/rules/${ruleName}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rule[i]),
      });
      //we could use the result for error checking
      const result = await response.json();
      console.log("Put request result:", result);
    }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [rule, setRule] = React.useState([stubData]);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleDataSet = (index, name, value) => {
    let expandedRule = [...rule];
    expandedRule[index][name] = value;
    setRule(expandedRule);
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
      // showByClass("exception", false);
      let rule1 =
        rule[0].user_input_integer > rule[0].constraint_parameter_integer;

      let rule2 = false;
      // let rule2 =
      //   (Date.now() - rule[1].user_input_integer) / (1000 * 60) >
      //   rule[1].constraint_parameter_integer;

      let except1 = false;
      // let except1 =
      // rule[3].user_input_boolean &&
      // rule[4].user_input_boolean &&
      // rule[5].user_input_boolean;

      // showByClass("exception", !(rule1 || rule2));
      return rule1 || rule2 || except1;
    };

    // putAPIData(ruleName);

    setClearToLaunch(isRuleClear());
  }, [rule]);

  React.useEffect(() => {
    putAPIData(ruleName);
  }, [rule]);

  React.useEffect(() => {
    getAPIData(ruleName);
  }, []);

  return (
    <div>
      <Card
        sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 28 }} color="text.primary" gutterBottom>
            {/* get from table name */}
            {properCase(ruleName)} Rule
          </Typography>
          <Typography variant="h5" component="div">
            {clearToLaunch ? "Clear" : "Violation"}
          </Typography>
          {/* drop all graphics into folder and name according to table... call by reference */}
          <CardMedia
            component="img"
            height="194"
            image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt="image link"
          />
          {/* {rule.map((element, index) => (
            <Typography sx={{ mb: 1.5 }} color="text.secondary" key={index}>
              {element.constraint_name}: {element.user_input_integer}
            </Typography>
          ))} */}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleModal()}>
            Change Rule Data
          </Button>
        </CardActions>
      </Card>
      <ModalGeneric
        openModal={openModal}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleDataSet={handleDataSet}
      />
    </div>
  );
}
