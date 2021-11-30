import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
import lightningPic from "../images/lightning.png";
import sefmPic from "../images/sefm.png";
import attachedPic from "../images/attached.png";
import cumulusPic from "../images/cumulus.png";
import detachedPic from "../images/detached.png";
import debrisPic from "../images/debris.png";
import disturbedPic from "../images/disturbed.png";
import smokePic from "../images/smoke.png";
import thickPic from "../images/thick.png";
import triboPic from "../images/tribo.png";
import cloudTempCon from "../images/cloudTempCon.png";
import distanceCon from "../images/distanceCon.png";
import prepCon from "../images/prepCon.png";
import revCon from "../images/revCon.png";
import sefmCon from "../images/sefmCon.png";
import timeCon from "../images/timeCon.png";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";

var imageObject = {
  lightning: [lightningPic, distanceCon, timeCon, sefmCon],
  attached: [attachedPic, cloudTempCon, distanceCon, timeCon],
  detached: [detachedPic, cloudTempCon, distanceCon, timeCon, sefmCon],
  disturbed: [disturbedPic, cloudTempCon, prepCon, distanceCon],
  debris: [debrisPic, cloudTempCon, distanceCon, timeCon, sefmCon],
  smoke: [smokePic, cloudTempCon, distanceCon, timeCon],
  thick: [thickPic, cloudTempCon, distanceCon],
  tribo: [triboPic, revCon, cloudTempCon, distanceCon],
  cumulus: [cumulusPic, cloudTempCon, distanceCon, sefmCon],
  sefm: [sefmPic, sefmCon, timeCon, distanceCon],
};

export default function RuleGeneric(props) {
  const { loading = false } = props;
  const { ruleName } = props;

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
    let expandedRule = [...rule];
    expandedRule[index][name] = value;
    setRule(expandedRule);
  };

  const properCase = (stringVal) => {
    return stringVal.slice(0, 1).toUpperCase() + stringVal.slice(1);
  };

  // Test code for hiding children groups
  // const showByClass = (name, show) => {
  //   let classArray = document.getElementsByClassName(name);
  //   if (classArray) {
  //     for (let i = 0; i < classArray.length; i++) {
  //       classArray[i].removeAttribute("hidden");
  //     }
  //   }
  //   if (classArray && !show) {
  //     for (let i = 0; i < classArray.length; i++) {
  //       classArray[i].setAttribute("hidden", "true");
  //     }
  //   }
  // };

  React.useEffect(() => {
    const isRuleClear = () => {
      let truthArray = [];
      let truthGroups = [];
      let showChildren = [];

      for (let i = 0; i < rule.length; i++) {
        truthGroups.push(...rule[i].logic_group.split(","));
        let logicSplit = [...rule][i].logic_group.split(",");

        if (rule[i].constraint_parameter_boolean !== null) {
          truthArray[i] = [
            rule[i].user_input_boolean === rule[i].constraint_parameter_boolean,
            logicSplit,
          ];
        } else {
          if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("distance")
          ) {
            rule[i].user_input_integer = rule[i].user_input_integer
              ? rule[i].user_input_integer
              : 0;

            truthArray[i] = [
              Function(
                `return ${rule[i].user_input_integer} ${rule[i].constraint_operator} ${rule[i].constraint_parameter_integer}`
              )(),
              logicSplit,
            ];
            //*** If Function is rejected, use this instead
            //
            // switch (rule[i].constraint_operator) {
            //   case "=":
            //     truthArray[i] = [
            //       rule[i].user_input_integer ===
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">":
            //     truthArray[i] = [
            //       rule[i].user_input_integer >
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case "<":
            //     truthArray[i] = [
            //       rule[i].user_input_integer <
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">=":
            //     truthArray[i] = [
            //       rule[i].user_input_integer >=
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">=":
            //     truthArray[i] = [
            //       rule[i].user_input_integer <=
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   default:
            //     false;
            // }
          } else if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("time")
          ) {
            truthArray[i] = [
              Function(
                `return ${
                  (Date.now() - rule[i].user_input_integer) / (1000 * 60)
                } ${rule[i].constraint_operator} ${
                  rule[i].constraint_parameter_integer
                }`
              )(),
              logicSplit,
            ];
            //*** If Function is rejected, use this instead
            //
            // switch (rule[i].constraint_operator) {
            //   case "=":
            //     truthArray[i] = [
            //       ((Date.now() - rule[i].user_input_integer) / (1000 * 60) >
            //         rule[i].constraint_parameter_integer) ===
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">":
            //     truthArray[i] = [
            //       ((Date.now() - rule[i].user_input_integer) / (1000 * 60) >
            //         rule[i].constraint_parameter_integer) >
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case "<":
            //     truthArray[i] = [
            //       ((Date.now() - rule[i].user_input_integer) / (1000 * 60) >
            //         rule[i].constraint_parameter_integer) <
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">=":
            //     truthArray[i] = [
            //       ((Date.now() - rule[i].user_input_integer) / (1000 * 60) >
            //         rule[i].constraint_parameter_integer) >=
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   case ">=":
            //     truthArray[i] = [
            //       ((Date.now() - rule[i].user_input_integer) / (1000 * 60) >
            //         rule[i].constraint_parameter_integer) <=
            //         rule[i].constraint_parameter_integer,
            //       logicSplit,
            //     ];
            //     break;
            //   default:
            //     false;
            // }
          }
        }
      }

      truthGroups = [
        ...new Set(truthGroups.filter((element) => element !== null)),
      ]
        .sort()
        .reverse();

      for (let j = 0; j < truthGroups.length; j++) {
        if (!truthArray.length) {
          break;
        }
        let restOfTruth = truthArray.filter(
          (element) => !element[1].includes(truthGroups[j])
        );

        let filteredTruth = truthArray.filter((element) =>
          element[1].includes(truthGroups[j])
        );

        let parentGroup = filteredTruth[0][1][filteredTruth[0][1].length - 2];
        let parentFilter = restOfTruth.filter(
          (element) => element[1].slice(-1)[0] === parentGroup
        );

        let localTruth = filteredTruth.reduce(
          (prev, curr) => {
            if (truthGroups[j].endsWith("&")) {
              return [
                curr[0] && (typeof prev === "boolean" ? prev : prev[0]),
              ].concat([...curr].splice(1));
            } else {
              return [
                curr[0] || (typeof prev === "boolean" ? prev : prev[0]),
              ].concat([...curr].splice(1));
            }
          },
          truthGroups[j].endsWith("&") ? true : false
        );

        let parentTruth = parentFilter.reduce(
          (prev, curr) => {
            if (parentGroup.includes("&")) {
              return [
                curr[0] && (typeof prev === "boolean" ? prev : prev[0]),
              ].concat([...curr].splice(1));
            } else {
              return [
                curr[0] || (typeof prev === "boolean" ? prev : prev[0]),
              ].concat([...curr].splice(1));
            }
          },
          parentGroup && parentGroup.includes("&") ? true : false
        );

        if (!parentTruth[0]) {
          showChildren.push(truthGroups[j]);
        }

        if (localTruth.length) {
          localTruth[1].pop();
        }

        restOfTruth.push(localTruth);
        truthArray = restOfTruth;
      }

      // Test code for hiding children groups
      // for (let l = 0; l < truthGroups.length; l++) {
      //   if (showChildren.includes(truthGroups[l])) {
      //     showByClass(truthGroups[l], true);
      //   } else {
      //     showByClass(truthGroups[l], false);
      //   }
      // }

      return truthArray.length ? truthArray[0][0] : false;
    };

    putAPIData(ruleName);

    setClearToLaunch(isRuleClear());
  }, [rule]);

  React.useEffect(() => {
    getAPIData(ruleName);
  }, []);

  const [altimage, setAltimage] = useState([]);

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
                {ruleName.slice(0, 2).toUpperCase()}
              </Avatar>
            )}
          </Box>

          {/* Rule Name */}
          <Box sx={{ width: "100%", color: "#212121" }}>
            {loading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography sx={{ fontSize: 25 }}>
                {" "}
                {properCase(ruleName)}{" "}
              </Typography>
            )}
          </Box>
        </Box>

        {/* LAUNCH RESULT */}
        <Box
          sx={{ display: "flex", justifyContent: "center", color: "#212121" }}
        >
          {loading ? (
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography sx={{ fontSize: 20 }}>
              {" "}
              {clearToLaunch ? "Cleared" : "Violated"}{" "}
            </Typography>
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
            image={imageObject[ruleName][0]}
            alt="LCCImg"
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
            {loading ? (
              <Skeleton width="40%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: "bold",
                    alignItems: "center",
                    color: "#212121",
                  }}
                >
                  Considerations:
                </Typography>
              </Box>
            )}

            {loading ? (
              <Skeleton variant="rectangular" width="19%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            ) : (
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "200px",
                }}
                component="img"
                image={imageObject[ruleName][1]}
                alt={setAltimage}
              />
            )}

            {loading ? (
              <Skeleton variant="rectangular" width="19%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            ) : (
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "200px",
                }}
                component="img"
                image={imageObject[ruleName][2]}
                alt={setAltimage}
              />
            )}

            {loading ? (
              <Skeleton variant="rectangular" width="19%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            ) : (
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "200px",
                }}
                component="img"
                image={imageObject[ruleName][3]}
                alt={setAltimage}
              />
            )}

            {loading ? (
              <Skeleton variant="rectangular" width="19%">
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
            ) : (
              <CardMedia
                style={{
                  width: "auto",
                  maxHeight: "200px",
                }}
                component="img"
                image={imageObject[ruleName][4]}
                alt={setAltimage}
              />
            )}
          </Box>
        </CardContent>

        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* PENCIL */}
          <Button size="small" onClick={() => handleModal()}>
            <IconButton aria-label="fill" sx={{ color: "#9e9e9e" }}>
              <CreateIcon />
            </IconButton>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

// RuleGeneric.propTypes = {
//   loading: PropTypes.bool,
// };
