# 45 SLD Weather App

The purpose of this app is to provide an interactive tool for the weather squadron to utilize as a way to determine whether a weather violation is occuring. There are ten launch commit criteria that must be go for launch prior to T-0. This tool takes in criteria from the NASA 4010 documentation pinpointing the different commit criteria for launch ([NASA 4010](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwilnNOa5qT0AhU1RDABHaWSALcQFnoECAgQAQ&url=https%3A%2F%2Fstandards.nasa.gov%2Fstandard%2Fnasa%2Fnasa-std-4010&usg=AOvVaw0Ha7XD4eqGmsQ5aAiJ-TH0)).

# Routes to the backend
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

# Launch Commit Criteria Table Date Rev1
## Lightning Rule
#### From endpoint /rules/lightning
````js
[
    {
        "id": 1,
        "constraint_name": "What is the slant distance to the lightning strike? (nmi)",
        "constraint_parameter_integer": 10,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "What was the time of the last lightning strike?",
        "constraint_parameter_integer": 30,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Was the cloud that produced the lightning strike within 10 nmi?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Is there at least one working field mill within 5 nmi of the lightning strike?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Was the highest absolute value field mill measurement in 5 nmi of lightning strike for 15 minutes greater than or equal to 1000 V/m?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Debris Cloud Rule
#### From endpoint /rules/debris
````js
[
    {
        "id": 1,
        "constraint_name": "Have of the following occurred: ",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "The debris cloud is observed to be detached from the parent cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "The debris cloud is observed to have formed by the collapse of the parent cloud top to an altitude where the temperature is warmer than -10 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Any lightning discharges occuring within or from the debris cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Has it been 3 hours since any the occurrence of the above three conditions?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "Is the vehicle’s flight path through a debris cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "Is the portion of the debris cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 8,
        "constraint_name": "The MRR is less than +7.5 dBZ everywhere within the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 9,
        "constraint_name": "Is the vehicle’s flight path 0-3nmi away from the debris cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 10,
        "constraint_name": "Is there is at least one working field mill at a horizontal distance of less than or equal to 5 nmi from the debris cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 11,
        "constraint_name": "The absolute values of all electric field measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, and at each field mill, have been less than 1000 V m-1 for at least 15 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 12,
        "constraint_name": "Is the largest radar reflectivity from any part of the debris cloud less than or equal to a slant distance of 5 nmi from the flight path has been less than +10 dBZ for at least 15 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 13,
        "constraint_name": "Is the portion of the debris cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 14,
        "constraint_name": "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Thick Cloud Rule
#### From enpoint /rules/thick
````js
[
    {
        "id": 1,
        "constraint_name": "Is the flight path carrying the vehicle through a transparent cloud layer?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Is the transparent cloud layer greater than or equal to 1.4 km thick and any part of the cloud layer within the flight path is located at an alt. where the temp. is between 0 °C and -20 °C, inclusive?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Is it connected to a thick cloud layer that, at a slant distance of <= to 5 nmi from the flight path, is >= to 1.4 km thick and has any part located at any alt. where the temp. is between 0 °C and -20 °C, inclusive?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Is the thick cloud layer a cirriform cloud layer that has never been associated with convective clouds?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "The cloud layer in question is located entirely at altitudes where the temperature is colder than or equal to -15 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "The cloud layer in question shows no evidence of containing liquid water?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "The cloud layer does not contain a radar reflectivity of 0 dBZ or greater at any location that is less than or equal to 5 nmi from the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Smoke Cloud Rule
#### From enpoint /rules/smoke
````js
[
    {
        "id": 1,
        "constraint_name": "Will the flight path carry the vehicle through a non-transparent cumulus cloud attached a parent smoke plume?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Will the flight path carry the vehicle through a non-transparent cumulus cloud that has been detached from a smoke plume within the last 60 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Detached Anvil Cloud Rule
#### From endpoint /rules/detached
````js
[
    {
        "id": 1,
        "constraint_name": "Does the flight path go through a detached anvil cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Have 4  hours passed since the last lightning strike from that anvil cloud and has it been 3 hours since that anvil cloud detached from its parents cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Are any portions of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "The MRR is less than +7.5 dBZ everywhere within the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Is the flight path greater than 0 nmi and less than 3 nmi from cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "Has it been 30 minutes since every lightning discharge within or from the parent cloud or anvil cloud before detachment of the anvil cloud, and after every lightning discharge within or from the detached anvil cloud after detachment?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "Has the portion of the detached anvil cloud located less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 8,
        "constraint_name": "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 9,
        "constraint_name": "Has it been 3 hours since strike from a parent or detached anvil cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 10,
        "constraint_name": "Is there is at least one working field mill at a horizontal distance of less than or equal to 5 nmi from the detached anvil cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 11,
        "constraint_name": "Is the absolute values of all electric field measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, and at each field mill been less than 1000 V/m for at least 15 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 12,
        "constraint_name": "Is the largest radar reflectivity from any part of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path has been less than +10 dBZ for at least 15 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 13,
        "constraint_name": "Is the portion of the detached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path is located entirely at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 14,
        "constraint_name": "Is the MRR is less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 15,
        "constraint_name": "Is the flight path at a slant distance of greater than 3 nmi and less than or equal to 10 nmi from a detached anvil cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 16,
        "constraint_name": "Has it been 30 minutes since the last lightning discharge within or from the parent cloud or anvil cloud before detachment, and after every lightning discharge within or from the detached anvil cloud after detachment?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 17,
        "constraint_name": "Is the portion of the detached anvil cloud at a slant distance of less than or equal to 10 nmi from the flight path, and is it at altitudes where the temperature is colder than 0 °C",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Attached Anvil Cloud Rule
#### From endpoint /rules/attached
````js
[
    {
        "id": 1,
        "constraint_name": "Is the flight path through or within 3 nmi of clouds?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Is the portion of the attached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Is MRR less than +7.5 dBZ at every point at a slant distance of less than or equal to 1 nmi from the flight path?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Is the flight path between 3 nmi and 5 nmi from cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Is the portion of the attached anvil cloud at a slant distance of less than or equal to 5 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "Is the flight path between 5 nmi and 10 nmi from cloud?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "Is the portion of the attached anvil cloud that is at a slant distance of less than or equal to 10 nmi from the flight path located entirely at altitudes where the temperature is colder than 0°C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Triboelectrification Rule
#### From endpoint /rules/tribo
````js
[
    {
        "id": 1,
        "constraint_name": "Will the flight path carry the launch vehicle through any part of a cloud at any altitude where:",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "The temperature is colder than or equal to -10 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "The launch vehicle’s velocity is less than or equal to 910 m s-1 (3000 ft s-1)?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Has the launch vehicle been treated for surface electrification such that:",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "All surfaces of the launch vehicle susceptible to ice particle impact are such that the surface resistivity is less than 109 ohms per square?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "All conductors on surfaces, including dielectric surfaces that have been coated with conductive materials, are bonded to the launch vehicle by a resistance that is less than 105 ohms?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "Have test or analysis demonstrated that electrostatic discharges on the surface of the launch vehicle caused by triboelectrification will not be hazardous to the launch vehicle or the spacecraft?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Disturbed Weather Rule
#### From routhe /rules/disturbed
````js
[
    {
        "id": 1,
        "constraint_name": "Will the flight path carry the launch vehicle through a non-transparent cloud ,or at a slant distance of 0 - 5 nmi, associated with disturbed weather that includes clouds with tops at altitudes where the temperature is colder than 0 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Is the cloud producing moderate or greater precipitation?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Is there evidence of melting precipitation such as a radar bright band?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Surface Electric Field Rule
#### From endpoint /rules/sefm
````js
[
    {
        "id": 1,
        "constraint_name": "Is the absolute value of any electrical field measurement at a horizontal distance of less than or equal to 5 nmi from the flight path been greater than or equal to 1500 V/m?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Is the absolute value of any electrical field measurement at a horizontal distance of less than or equal to 5 nmi from the flight path been greater than or equal to 1000 V/m?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Are all clouds within 10 nmi from the flight path transparent?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "All non-transparent clouds at a slant distance less than or equal to 10 nmi from the flight path:",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": null,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Have tops at altitudes where the temperature is warmer than or equal to +5°C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "Been part of convection clouds with cloud tops at altitudes where the temperature was colder than or equal to -10°C for 3 hours?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": true,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

## Cumulus Cloud Rule
#### From endpoint /rules/cumulus
````js
[
    {
        "id": 1,
        "constraint_name": "Is the cloud between 0 and 5 nmi where the cloud top is at an altitude where the temp is  colder than or equal  -10° C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 2,
        "constraint_name": "Is there a cloud between 5 and 10 where the cloud top is at an altitude where the temp is  colder than or equal  -20° C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 3,
        "constraint_name": "Will the  flight path be through the  cloud where the cloud has a top at an altitude where the temperature is colder than or equal to +5 °C and warmer than -5 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 4,
        "constraint_name": "Is the cloud producing precipitation?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 5,
        "constraint_name": "Is the horizontal distance from the center of the cloud top to at least 1 working field mill less than 2 nmi?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 6,
        "constraint_name": "Are all electric field mill measurements at a horizontal distance of less than or equal to 5 nmi from the flight path, between -100 V/m and +500 V/m for at least 15 minutes?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    },
    {
        "id": 7,
        "constraint_name": "Will the flight path be through a cloud where the cloud has a top at an altitude where the temperature is colder than or equal to -5 °C?",
        "constraint_parameter_integer": null,
        "constraint_parameter_boolean": false,
        "user_input_integer": null,
        "user_input_boolean": null
    }
]
````

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# user-dialog
