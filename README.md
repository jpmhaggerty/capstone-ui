



This project was created from the create-react-app project which is a ready-made React application starter.

## Get Started
Install your node modules

`npm i`

Run the app

`npm start`

## run cypress tests locally in container

`docker run -it -v $PWD:/e2e -w /e2e cypress/included:3.4.0 --env configFile=pipeline`
# 45 SLD Weather App

The purpose of this app is to provide an interactive tool for the weather squadron to utilize as a way to determine whether a weather violation is occurring. There are ten launch commit criteria that must be go for launch prior to T-0. This tool takes in criteria from the NASA 4010 documentation pinpointing the different commit criteria for launch ([NASA 4010](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwilnNOa5qT0AhU1RDABHaWSALcQFnoECAgQAQ&url=https%3A%2F%2Fstandards.nasa.gov%2Fstandard%2Fnasa%2Fnasa-std-4010&usg=AOvVaw0Ha7XD4eqGmsQ5aAiJ-TH0)).

# User Stories

* As a user, I want to be able to view the current status of the Lightning Launch Commit Criteria Rules during operations, via mobile phone or computer.

* As a user, I want to be able to input new weather data that I receive from the meterological systems I have at hand to re-evaluate a rule's status.

* As a user, I want to be able to edit the constraints contained in each of the rules, that way if there are changes to the standards at which weather must be evaluated, the rules of the app can be updated to keep up with those changing standards.

* As a user, I want to

* As a user, I want to be able to easily access the most up-to-date standards in NASA 4010 for clarification on any of the regulations.

* As a user, I want to be able to

# Description



# Routes to retrieve backend data
## GET Routes
* /rules/attached
* /rules/cumulus
* /rules/debris
* /rules/detached
* /rules/disturbed
* /rules/lightning
* /rules/sefm
* /rules/smoke
* /rules/thick
* /rules/tribo

<!-- # Launch Commit Criteria Table Data Rev1
## Lightning Rule
#### From endpoint /rules/lightning
````js
[
        {
          constraint_name:
            "What is the slant distance to the lightning strike? (nmi)",
          constraint_parameter_integer: 10,
          constraint_parameter_boolean: null,
          user_input_integer: 0,
          user_input_boolean: null,
          logic_group: "abcd",
        },
        {
          constraint_name: "What was the time of the last lightning strike?",
          constraint_parameter_integer: 30,
          constraint_parameter_boolean: null,
          user_input_integer: Date.now(),
          user_input_boolean: null,
          logic_group: "abcd",
        },
        {
          constraint_name:
            "Was the cloud that produced the lightning strike within 10 nmi?",
          constraint_parameter_integer: null,
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "abcd",
        },
        {
          constraint_name:
            "Is there at least one working field mill within 5 nmi of the lightning strike?",
          constraint_parameter_integer: null,
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "abcd",
        },
        {
          constraint_name:
            "Was the highest absolute value field mill measurement in 5 nmi of lightning strike for 15 minutes greater than or equal to 1000 V/m?",
          constraint_parameter_integer: null,
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "abcd",
        },
      ]
````

## Debris Cloud Rule
#### From endpoint /rules/debris
````js
[
        //1- Not an input
        //2
        {
          constraint_name:
            "Have three hours passed since the latest observance of the debris cloud detaching from the parent cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B&",
        },
        //3
        {
          constraint_name:
            "Have three hours passed since the latest observance of the debris cloud forming by the collapse of the parent cloud top to an altitude where the temperature is warmer than -10 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B&",
        },
        //4
        {
          constraint_name:
            "Have three hours passed since the latest observance of any lightning discharges from or within the debris cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B&",
        },
        //5- Not an input
        //6
        {
          constraint_name:
            "Is the vehicle’s flight path through a debris cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,C|",
        },
        //7
        {
          constraint_name:
            "Is the portion of the debris cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,C|,D&",
        },
        //8
        {
          constraint_name:
            "The MRR is less than +7.5 dBZ everywhere within the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,C|,D&",
        },
        //9
        {
          constraint_name:
            "Is the vehicle’s flight path 0-3nmi away from the debris cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,E|",
        },
        //10
        {
          constraint_name:
            "Is there is at least one working field mill at a horizontal distance of less than or equal to 5 nmi from the debris cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,E|,F&",
        },
        //11
        {
          constraint_name:
            "The absolute values of all electric field measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, and at each field mill, have been less than 1000 V m-1 for at least 15 minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,E|,F&",
        },
        //12
        {
          constraint_name:
            "Is the largest radar reflectivity from any part of the debris cloud less than or equal to a slant distance of 5 nmi from the flight path has been less than +10 dBZ for at least 15 minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,E|,F&",
        },
        //13
        {
          constraint_name:
            "Is the portion of the debris cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,E|,G&",
        },
        //14
        {
          constraint_name:
            "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,E|,G&",
        },
]
````

## Thick Cloud Rule
#### From enpoint /rules/thick
````js
[
        //1
        {
          constraint_name:
            "Is the flight path carrying the vehicle through a non-transparent cloud layer?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A|,B|",
        },
        //2
        {
          constraint_name:
            "Is the transparent cloud layer greater than or equal to 1.4 km thick and any part of the cloud layer within the flight path is located at an alt. where the temp. is between 0 °C and -20 °C, inclusive?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A|,B|,C&",
        },
        //3
        {
          constraint_name:
            "Is it connected to a thick cloud layer that, at a slant distance of <= to 5 nmi from the flight path, is >= to 1.4 km thick and has any part located at any alt. where the temp. is between 0 °C and -20 °C, inclusive?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A|,B|,C&",
        },
        //4
        {
          constraint_name:
            "Is the thick cloud layer a cirriform cloud layer that has never been associated with convective clouds?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A|,D&",
        },
        //5
        {
          constraint_name:
            "The cloud layer in question is located entirely at altitudes where the temperature is colder than or equal to -15 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A|,D&",
        },
        //6
        {
          constraint_name:
            "The cloud layer in question shows no evidence of containing liquid water?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A|,D&",
        },
        //7
        {
          constraint_name:
            "The cloud layer does not contain a radar reflectivity of 0 dBZ or greater at any location that is less than or equal to 5 nmi from the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A|",
        },
      ]
````

## Detached Anvil Cloud Rule
#### From endpoint /rules/detached
````js
[
        //1
        {
          constraint_name:
            "Does the flight path go through a detached anvil cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,B|",
        },
        //2
        {
          constraint_name:
            "Have 4 hours passed since the last lightning strike from that anvil cloud and has it been 3 hours since that anvil cloud detached from its parent's cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|",
        },
        //3
        {
          constraint_name:
            "Are any portions of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,C&",
        },
        //4
        {
          constraint_name:
            "The MRR is less than +7.5 dBZ everywhere within the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,C&",
        },
        //5
        {
          constraint_name:
            "Is the flight path greater than 0 nmi but less than 3 nmi from cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,D|",
        },
        //6-Redundant
        // {
        //   constraint_name:
        //   "Have 30 minutes elapsed since the last lightning discharge originating from or within either the parent or anvil cloud (before detachment), and since any lightning discharge from or within the detached anvil cloud after detachment?",
        //   constraint_parameter_integer: null,
        //   constraint_operator: "===",
        //   constraint_parameter_boolean: true,
        //   user_input_integer: null,
        //   user_input_boolean: false,
        //   logic_group: "A&,D|,E|",
        // },
        //6A- Time out
        {
          constraint_name:
          "Have more than 3 hours elapsed since the last lightning discharge originating from or within either the parent or anvil cloud (before detachment), and since any lightning discharge from or within the detached anvil cloud after detachment?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|",
        },
        //7
        {
          constraint_name:
            "Has the portion of the detached anvil cloud located less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,F&",
        },
        //8
        {
          constraint_name:
            "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,F&",
        },
        //9
        {
          constraint_name:
          "Have more than 30 minutes elapsed since the last lightning discharge originating from or within either the parent or anvil cloud (before detachment), and since any lightning discharge from or within the detached anvil cloud after detachment?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,G&",
        },
        //10
        {
          constraint_name:
            "Is there is at least one working field mill at a horizontal distance of less than or equal to 5 nmi from the detached anvil cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,G&,H&",
        },
        //11
        {
          constraint_name:
            "Is the absolute values of all electric field measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, and at each field mill been less than 1000 V/m for at least 15 minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,G&,H&",
        },
        //12
        {
          constraint_name:
            "Is the largest radar reflectivity from any part of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path has been less than +10 dBZ for at least 15 minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|,G&,H&",
        },
        //13- Redundant
        // {
        //   constraint_name:
        //     "Is the portion of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
        //   constraint_parameter_integer: null,
        //   constraint_operator: "===",
        //   constraint_parameter_boolean: true,
        //   user_input_integer: null,
        //   user_input_boolean: false,
        //   logic_group: "A&,D|,G&,I&",
        // },
        //14- Redundant
        // {
        //   constraint_name:
        //     "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
        //   constraint_parameter_integer: null,
        //   constraint_operator: "===",
        //   constraint_parameter_boolean: true,
        //   user_input_integer: null,
        //   user_input_boolean: false,
        //   logic_group: "A&,D|,G&,I&",
        // },
        //15
        {
          constraint_name:
            "Is the flight path at a slant distance of greater than 3 nmi and less than or equal to 10 nmi from a detached anvil cloud?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,J|,K|",
        },
        //16
        {
          constraint_name:
          "Have 30 minutes elapsed since the last lightning discharge originating from or within either the parent or anvil cloud (before detachment), and since any lightning discharge from or within the detached anvil cloud after detachment?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,J|,K|",
        },
        //17
        {
          constraint_name:
            "Is the portion of the detached anvil cloud at a slant distance of less than or equal to 10 nmi from the flight path, and is it at altitudes where the temperature is colder than 0 °C",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,J|",
        },
]
````

## Attached Anvil Cloud Rule
#### From endpoint /rules/attached
````js
[
        //1
        {
          constraint_name:
            "Is the flight path through or within 3 nmi of clouds?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,B|",
        },
        //2
        {
          constraint_name:
            "Is the portion of the attached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,E&",
        },
        //3
        {
          constraint_name:
            "Is MRR less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,E&",
        },
        //4
        {
          constraint_name:
            "Is the flight path between 3 nmi and 5 nmi from cloud with a lightning discharge occurring within or from the parent cloud or anvil cloud over the past three hours?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,C|",
        },
        //5
        {
          constraint_name:
            "Is the portion of the attached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,C|",
        },
        //6
        {
          constraint_name:
          "Is the flight path between 5 nmi and 10 nmi from cloud with a lightning discharge occurring within or from the parent cloud or anvil cloud over the past thirty minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,D|",
        },
        //7
        {
          constraint_name:
            "Is the portion of the attached anvil cloud that is at a slant distance of less than or equal to 10 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,D|",
        },
]
````

## Cumulus Cloud Rule
#### From endpoint /rules/cumulus
````js
[
        {
          constraint_name:
            "Are there any cumulus clouds within 5 and 10 nmi from the flight path with cloud tops at an altitude where the temp is colder than or equal -20° C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&",
        },
        {
          constraint_name:
          "Are there any cumulus clouds within 0 and 5 nmi from the flight path with cloud tops at an altitude where the temp is colder than or equal -10° C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&",
        },
        {
          constraint_name:
            "Will the flight path be through a cloud where the cloud has a top at an altitude where the temperature is colder than or equal to -5 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&",
        },
        {
          constraint_name:
            "Will the  flight path be through the  cloud where the cloud has a top at an altitude where the temperature is colder than or equal to +5 °C and warmer than -5 °C?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,B|",
        },
        {
          constraint_name: "Is the cloud producing precipitation?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: false,
          user_input_integer: null,
          user_input_boolean: true,
          logic_group: "A&,B|,C&",
        },
        {
          constraint_name:
            "Is the horizontal distance from the center of the cloud top to at least 1 working field mill less than 2 nmi?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,C&",
        },
        {
          constraint_name:
            "Have all electric field mill measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, between -100 V/m and +500 V/m for at least 15 minutes?",
          constraint_parameter_integer: null,
          constraint_operator: "===",
          constraint_parameter_boolean: true,
          user_input_integer: null,
          user_input_boolean: false,
          logic_group: "A&,B|,C&",
        },
]
```` -->






