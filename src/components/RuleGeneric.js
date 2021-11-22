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
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import fetch from "cross-fetch";
import CreateIcon from '@mui/icons-material/Create';
import sefcon from "../images/sefcon.png";

export default function RuleGeneric({ ruleName }) {
  const stubData = {
    id: 100,
    constraint_name: "",
    constraint_parameter_integer: 0,
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
    console.log("Put request content: ", rule);
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
          truthArray[i] =
            rule[i].user_input_boolean === rule[i].constraint_parameter_boolean;
        } else {
          if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("distance")
          ) {
            truthArray[i] =
              rule[i].user_input_integer > rule[i].constraint_parameter_integer;
          } else if (
            rule[i].constraint_name &&
            rule[i].constraint_name.includes("time")
          ) {
            truthArray[i] =
              (Date.now() - rule[1].user_input_integer) / (1000 * 60) >
              rule[1].constraint_parameter_integer;
          }
        }
      }

      console.log("Test logic: ", truthArray);

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

  return (
    <div>
      {/* { <Card
        sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}
      > */}


          {/* CARD HEADER */}


      {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center'}}>

        <Box sx={{ display: 'flex'}}>
          <Avatar
            sx={{ bgcolor: "rgba(32,31,31,0.637)", color: grey[50],   }}
            aria-label="name avater"
          >
            SEF
          </Avatar>
        </Box>

            <Box>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                  {properCase(ruleName)} Rule
                </Typography>
            </Box>

      </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5" component="div">
            {clearToLaunch ? "Clear" : "Violation"}
          </Typography>
        </Box> */}



          {/* drop all graphics into folder and name according to table... call by reference.. Yurik is working on this */}

          {/* MAIN CARD IMAGE */}
          {/* <CardMedia
            component="img"
            height="194"
            image="https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg"
            alt="image link"
          />

        <CardContent> */}
          {/* {rule.map((element, index) => (
            <Typography sx={{ mb: 1.5 }} color="text.secondary" key={index}>
              {element.constraint_name}: {element.user_input_integer}
            </Typography>
          ))} */}
        {/* </CardContent>

        <CardActions disableSpacing> */}

          {/* PENCIL */}

          {/* <Box>
            <Button size="small" onClick={() => handleModal()}>
              <IconButton aria-label="fill">
                <CreateIcon/>
              </IconButton>
            </Button>
          </Box>

        </CardActions> */}

      {/* </Card>  */}



      <ModalGeneric
        openModal={openModal}
        openProMode={openProMode}
        ruleName={ruleName}
        rule={rule}
        handleModal={handleModal}
        handleProMode={handleProMode}
        handleDataSet={handleDataSet}
      />


<Card sx={{ maxWidth: 345 }} sx={{ minWidth: 100, bgcolor: clearToLaunch ? "#D7FFD7" : "#FFD7D7" }}>
  <Box sx={{ display: 'flex', flexDirection: 'row'}}/>

      <CardHeader
        avatar={

          <Avatar
            sx={{ bgcolor: "#123548", color: grey[50],   }}
            aria-label="recipe"
          >
            SE
          </Avatar>
        }

        title={properCase(ruleName)}

        />



          {/* LAUNCH RESULT */}
      <Box sx={{ display: 'flex', justifyContent: 'center'  }}>
        {clearToLaunch ? "Clear" : "Violation"}
      </Box>

      {/* BIG IMAGE */}
      <CardMedia component="img" image= "https://cdn.mos.cms.futurecdn.net/3nBMpxAkg5sAuHY8uaHy3B-1024-80.jpg" alt="SEF IMAGE" />

      {/* CONSIDERATIONS */}
      <CardContent>

    <Box  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'  }}>

    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold'}} >
      Considerations
    </Typography>

      <CardMedia
      style={{
        width: "auto",
        maxHeight: "200px"
                        }}
      component="img"
      image={sefcon}
      alt="alt legend pic"
      />

      <CardMedia
      style={{
        width: "auto",
        maxHeight: "200px"
                        }}
      component="img"
      image={sefcon}
      alt="alt legend pic"
      />

      <CardMedia
      style={{
        width: "auto",
        maxHeight: "200px"
                        }}
      component="img"
      image={sefcon}
      alt="alt legend pic"
      />

  </Box>

      </CardContent>


      <CardActions disableSpacing>
      <Button size="small" onClick={() => handleModal()}>
              <IconButton aria-label="fill">
                <CreateIcon/>
              </IconButton>
            </Button>
      </CardActions>

    </Card>

    </div>




  );
}
