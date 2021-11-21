import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ModalGeneric from "./ModalGeneric.js";
import Typography from "@mui/material/Typography";
import fetch from "cross-fetch";

export default function RuleGeneric({ruleName}) {
  const infoFromDatabase = {
    ruleName: "lightning",
    llccFlightPathRadius: 10,
    llccStrikeTimeDelay: 30,
    strikeTime: Date.now() - 6 * 60 * 60 * 1000,
    strikeDistToFlightPath: 25,
    cloudDistToFlightPath: false,
    strikeDistNearFieldMill: false,
    fieldStrengthLow: false,
  };

  const getAPIData = async (ruleName) => {
    const response = await fetch(`http://localhost:8080/rules/${ruleName}`);
    const result = await response.json();
    setRule(result);
  };

  const putAPIData = async (ruleName) => {
    console.log("Pre JSON", JSON.stringify(rule));
    for (let i = 0; i < rule.length; i++) {
      const response = await fetch(`http://localhost:8080/rules/${ruleName}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rule[i]),
      });
      const result = await response.json();
      console.log("Put request:", result);
    }
  };

  //set an array of objects for each rule
  // const backend = [
  //   {
  //     id: "auto-id for each rule question",
  //     description: "text for rule question",
  //     rule_int: "if rule is int based, limiting value-- otherwise null? or undefined?",
  //     rule_bool:
  //       "if rule is boolean based, pass or fail value-- otherwise null",
  //     user_int: "user input for integer value",
  //     user_bool: "user input for boolean value"
  //   },
  // ];

  //is the table call returning an object or an array?

  // "id": 1,
  // "constraint_name": "What is the slant distance to the lightning strike? (nmi)",
  // "constraint_parameter_integer": 10,
  // "constraint_parameter_boolean": null,
  // "user_input_integer": null,
  // "user_input_boolean": null

  //ruleName = table.name

  //derive input style from constraint_parameter (i.e. if ...integer is !null then make it an integer field)
  //use null field check to steer constraint and user fields

  // to add => table[0].constraint_name
  //llccFlightPathRadius = table[0].constraint_parameter_integer
  //strikeDistToFlightPath = table[0].user_input_integer

  // to add => table[1].constraint_name
  //llccStrikeTimeDelay = table[1].constraint_parameter_integer
  //strikeTime = table[1].user_input_integer

  // to add => table[2].constraint_name
  // to add => table[2].constraint_parameter_boolean
  //cloudDistToFlightPath = table[2].user_input_boolean

  // to add => table[3].constraint_name
  // to add => table[3].constraint_parameter_boolean
  //strikeDistNearFieldMill = table[3].user_input_boolean

  // to add => table[4].constraint_name
  // to add => table[4].constraint_parameter_boolean
  //fieldStrengthLow= table[4].user_input_boolean

  //looks like only three fields required per modal input line => good opportunity for mapping

  const [open, setOpen] = React.useState(false);
  //to be depricated
  const [ruleSet, setRuleSet] = React.useState(infoFromDatabase);
  // replaces ruleSet
  const [rule, setRule] = React.useState([infoFromDatabase]);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleDataSet = (index, name, value) => {
    console.log("Name and value", index, name, value);
    let expandedRule = [...rule];
    expandedRule[index][name] = value;
    setRule(expandedRule);
    // setRuleSet({ ...ruleSet, [name]: value });
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

    // putAPIData(ruleName);

    setClearToLaunch(isRuleClear());
  }, [ruleSet]);

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
        {console.log("Rule: ", rule)}
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
            alt="ruleSet image link"
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
        open={open}
        rule={rule}
        ruleName={ruleName}
        ruleSet={ruleSet}
        handleModal={handleModal}
        handleDataSet={handleDataSet}
      />
    </div>
  );
}