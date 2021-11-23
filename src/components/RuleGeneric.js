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
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

export default function RuleGeneric({ ruleName }, props) {
  const { loading = false } = props;

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

      let truthGroups = [];
      let uniqueTruthGroups = [];
      let runningTruth = [];
      let reducedTruthSummary = [];

      for (let k = truthDepth - 1; k >= 0; k--) {
        truthGroups = truthArray.map((element) => {
          return element[1][k] ? element[1][k] : null;
        });
        uniqueTruthGroups = [
          ...new Set(truthGroups.filter((element) => element !== null)),
        ];


        for (let l = 0; l < uniqueTruthGroups.length; l++) {
          let reducedTruth = truthArray.map((element) => {
              let position = element[1].indexOf(uniqueTruthGroups[l]);
              if (position > 0 && position === element[1].length - 1) {
                return [
                  element[0],
                  element[1][position],
                  element[1][position - 1],
                ];
              } else if (position === 0 && position === element[1].length - 1) {
                return [element[0], element[1][position], null];
              } else {
                return [];
              }
            })
            .filter((e) => e.length);

          //children nodes will be combined under a new array which needs to be called within reducer
          reducedTruthSummary = reducedTruth.reduce((prev, curr) => {
            let existsInRT = runningTruth.filter((element) =>
              element.indexOf(curr[1])
            );
            // console.log(
            //   "Is there an existing record in runningTruth?",
            //   existsInRT[0] ? existsInRT[0][0] : "No",
            //   curr[1]
            // );
            return existsInRT[0]
              ? [
                  existsInRT[0][1].slice(-1) === "&"
                    ? existsInRT[0][0] && curr[1].slice(-1) === "&"
                      ? prev[0] && curr[0]
                      : prev[0] || curr[0]
                    : existsInRT[0][0] || curr[1].slice(-1) === "&"
                    ? prev[0] && curr[0]
                    : prev[0] || curr[0],
                  curr[2],
                  null,
                ]
              : [
                  curr[1].slice(-1) === "&"
                    ? prev[0] && curr[0]
                    : prev[0] || curr[0],
                  curr[2],
                  null,
                ];
          });

          runningTruth.push(reducedTruthSummary);

          console.log(
            "Reduced truth group array: ",
            reducedTruth,
            reducedTruthSummary,
            runningTruth,
          );

          console.log("Final truth: ", runningTruth.reduce((prev, curr) => prev[0] || curr[0])[0])
        }
      }

      // showByClass("exception", false);
      let rule1 =
        rule[0].user_input_integer > rule[0].constraint_parameter_integer;

      let rule2 = false;

      // let rule2 =
      //   (Date.now() - rule[1].user_input_integer) / (1000 * 60) >
      //   rule[1].constraint_parameter_integer;

      let except1 = false;

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
        {/* Rule Avatar */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            {loading ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar
                sx={{ bgcolor: "#123548", color: grey[50] }}
                aria-label="avatar"
              >
                {" "}
                SE{" "}
              </Avatar>
            )}
          </Box>

          {/* Rule Name */}
          <Box sx={{ width: "100%" }}>
            {loading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography> {properCase(ruleName)} </Typography>
            )}
          </Box>
        </Box>

        {/* LAUNCH RESULT */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography> {clearToLaunch ? "Clear" : "Violation"} </Typography>
          )}
        </Box>

        {/* BIG IMAGE */}

        {loading ? (
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "57%" }} />
          </Skeleton>
        ) : (
          <CardMedia
            component="img"
            src="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt=""
          />
        )}

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
