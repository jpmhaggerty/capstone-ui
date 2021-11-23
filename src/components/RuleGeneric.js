import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import ModalGeneric from "./ModalGeneric.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import fetch from "cross-fetch";
import CreateIcon from "@mui/icons-material/Create";
import SEF from "../images/SEF.png";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

export default function RuleGeneric({ ruleName }) {
  const stubData = {
    id: 100,
    constraint_name: "",
    constraint_parameter_integer: 0,
    constraint_operator: "",
    constraint_parameter_boolean: false,
    user_input_integer: 0,
    user_input_boolean: false,
    logic_group: "",
  };

  const getAPIData = async (ruleName) => {
    const response = await fetch(`http://localhost:8080/rules/${ruleName}`);
    const result = await response.json();
    setRule(result);
  };

  const putAPIData = async (ruleName) => {
    // console.log("Put request content: ", rule);
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
      // console.log("Put request result:", result);
    }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [openProMode, setOpenProMode] = React.useState(false);
  const [rule, setRule] = React.useState([stubData]);
  const [clearToLaunch, setClearToLaunch] = React.useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
    !openModal ? setOpenProMode(false) : console.log("Modal called");
  };

  const handleProMode = () => {
    setOpenProMode(!openProMode);
  };

  const handleDataSet = (index, name, value) => {
    console.log("Change data: ", index, name, value);
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
      let truthArray = [];

      for (let i = 0; i < rule.length; i++) {
        if (rule[i].constraint_parameter_boolean !== null) {
          truthArray[i] = [
            rule[i].user_input_boolean === rule[i].constraint_parameter_boolean,
            rule[i].logic_group.split(","),
          ];
        } else {
          if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("distance")
          ) {
            switch (rule[i].constraint_operator) {
              case "eq":
                truthArray[i] = [
                  +rule[i].user_input_integer ===
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "gt":
                truthArray[i] = [
                  +rule[i].user_input_integer >
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "ge":
                truthArray[i] = [
                  +rule[i].user_input_integer >=
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "lt":
                truthArray[i] = [
                  +rule[i].user_input_integer <
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "le":
                truthArray[i] = [
                  +rule[i].user_input_integer <=
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              default:
                console.log("Might have a problem with distnace operator");
            }
          } else if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("time")
          ) {
            switch (rule[i].constraint_operator) {
              case "eq":
                truthArray[i] = [
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60) ===
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "gt":
                truthArray[i] = [
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60) >
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "ge":
                truthArray[i] = [
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60) >=
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "lt":
                truthArray[i] = [
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60) <
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              case "le":
                truthArray[i] = [
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60) <=
                    +rule[i].constraint_parameter_integer,
                  rule[i].logic_group.split(","),
                ];
                break;
              default:
                console.log("Might have a problem with time operator");
            }
          }
        }
      }

      // console.log("Test logic: ", truthArray);

      let truthDepth = 0;

      for (let j = 0; j < truthArray.length; j++) {
        truthDepth =
          truthArray[j] && truthArray[j][1].length > truthDepth
            ? truthArray[j][1].length
            : truthDepth;
      }

      // console.log("TD", truthDepth);

      let truthGroups = [];
      let uniqueTruthGroups = [];
      let runningTruth = [];

      for (let k = truthDepth - 1; k >= 0; k--) {
        truthGroups = truthArray.map((element) => {
          return element[1][k] ? element[1][k] : null;
        });
        uniqueTruthGroups = [
          ...new Set(truthGroups.filter((element) => element !== null)),
        ];
        for (let l = 0; l < uniqueTruthGroups.length; l++) {
          let reducedTruth = truthArray.filter(
            (element) =>
              element[1][k] === uniqueTruthGroups[l] &&
              element[1].length <= k + 1
          );

          let reducedTruthSample = truthArray.map((element) => {
            let position = element[1].indexOf(uniqueTruthGroups[l]);
            console.log("Position: ", position);
            //is the current uniqueTruthGroup in the logic_group?
            element[1].includes(uniqueTruthGroups[l])
              ? //does a parent exist- is the length of element[1] greater than 1?
                element[1].length > 1
                ? console.log(
                    "find index of unique and back-up one element",
                    element[1],
                    uniqueTruthGroups[l],
                    element[1].indexOf(uniqueTruthGroups[l])
                  )
                : console.log(
                    "this is a root element",
                    element[1],
                    uniqueTruthGroups[l],
                    element[1].indexOf(uniqueTruthGroups[l])
                  )
              :
                console.log("Not found");
            return;
          });

          // .filter((element) =>
          //     element[1][k] === uniqueTruthGroups[l] &&
          //     element[1].length <= k + 1
          //     );
          //     runningTruth.push([false, uniqueTruthGroups[l], "parent"])

          //runningTruth is an array which holds the collective truthiness of each grouping (i.e. A, B, C, etc.)
          //runningTruth should be evaluated for peers and link to parent
          //...might take the form [child group truth, child group id, parent group id]
          //can I build this array from the uniqueTruthGroups array? yes!

          console.log(
            "Reduced truth group array: ",
            reducedTruth,
            uniqueTruthGroups,
            runningTruth
          );

          //still need to reduce each group to a single boolean and store value (tuple?)
          //for inclusion at the parent level
          //reduction process should look for the stored value array

          //reducedTruth is an array which groups the t/f per peerage level

          // for (let m = 0; m < reducedTruth.length; m++) {
          //   for (let n = 0; n < runningTruth.length; n++) {
          //     if (!runningTruth[n].includes(reducedTruth[m])) {
          //       runningTruth.push([
          //         reducedTruth[m][0],
          //         reducedTruth[m][1].pop(),
          //       ]);
          //       // console.log("Branched to no runningTruth", runningTruth, [reducedTruth[m][0], reducedTruth[m][1].pop()])
          //     } else {
          //       //evaluate and update with existing element, then
          //       runningTruth[n] = [
          //         reducedTruth[m][0],
          //         reducedTruth[m][1].pop(),
          //       ];
          //       // console.log("Branched to existing runningTruth", runningTruth, [
          //       //   reducedTruth[m][0],
          //       //   reducedTruth[m][1].pop(),
          //       // ]);
          //     }
          //   }
          // }

          //code below is not yet complete
          // for (let m = 0; m < reducedTruth.length; m++) {
          //     if (runningTruth === null) {
          //       runningTruth = reducedTruth[m];
          //     } else if (uniqueTruthGroups[l].slice(1) === "|") {
          //       runningTruth = reducedTruth[m] || runningTruth;
          //     } else if (uniqueTruthGroups[l].slice(1) === "&") {
          //       runningTruth = reducedTruth[m] && runningTruth;
          //     }
          //   }
        }
      }

      // showByClass("exception", false);
      let rule1 =
        rule[0].user_input_integer > rule[0].constraint_parameter_integer;

      // console.log(rule[0].user_input_integer > rule[0].constraint_parameter_integer, rule[0].user_input_integer, rule[0].constraint_parameter_integer)

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
      // console.log("Truth table: ", rule1,  rule2 , except1)
      return rule1 || rule2 || except1;
    };

    putAPIData(ruleName);

    setClearToLaunch(isRuleClear());
  }, [rule]);

  React.useEffect(() => {
    getAPIData(ruleName);
  }, []);

  // const Image = styled('img')({
  //   width: '100%',
  // });



  return (
    <div>
      <ModalGeneric
        openModal={openModal}
        openProMode={openProMode}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
      />

      <Card
        sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }} />

        <CardHeader
          avatar={

            <Avatar
              sx={{ bgcolor: "#123548", color: grey[50] }}
              aria-label="recipe"
            >
              SE
            </Avatar>
          }


          title={properCase(ruleName)}
        />

        {/* LAUNCH RESULT */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {clearToLaunch ? "Clear" : "Violation"}
        </Box>

        {/* BIG IMAGE */}
        <CardMedia
          component="img"
          image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
          alt="SEF IMAGE"
        />

        {/* CONSIDERATIONS */}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Considerations
            </Typography>

            <CardMedia
              style={{
                width: "auto",
                maxHeight: "200px",
              }}
              component="img"
              image={SEF}
              alt="alt legend pic"
            />

            <CardMedia
              style={{
                width: "auto",
                maxHeight: "200px",
              }}
              component="img"
              image={SEF}
              alt="alt legend pic"
            />

            <CardMedia
              style={{
                width: "auto",
                maxHeight: "200px",
              }}
              component="img"
              image={SEF}
              alt="alt legend pic"
            />
          </Box>
        </CardContent>

        <CardActions disableSpacing>
          <Button size="small" onClick={() => handleModal()}>
            <IconButton aria-label="fill">
              <CreateIcon />
            </IconButton>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
