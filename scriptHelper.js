// Write your helper functions here!
//require 'isomorphic-fetch';

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let div=document.getElementById("missionTarget");
    div.innerHTML=`
    <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
   
}

function validateInput(testInput) {
   if (testInput==='')  {
    return "Empty"
   } else if (isNaN(Number(testInput))) {
        return "Not a Number";
   } else if (isNaN(Number(testInput))===false) {
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus=document.getElementById("pilotStatus");
    let copilotStatus=document.getElementById("copilotStatus");
    let fuel = document.getElementById("fuelStatus");
   let cargo = document.getElementById ("cargoStatus");

    if (validateInput(pilot)==="Empty"||validateInput(copilot)==="Empty"||validateInput(fuelLevel)==="Empty"||validateInput(cargoLevel)==="Empty") {
        alert("All fields Required!")
    } else if (validateInput(pilot)==="Is a Number"||validateInput(copilot)==="Is a Number") {
        alert("Please enter a valid input")
    } else if (validateInput(fuelLevel)==="Not a number"||validateInput(cargoLevel)==="Not a number") {
        alert ("Please enter a number")
    }else{
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        let launchStatus = document.getElementById ("launchStatus");
        if (fuelLevel < 10000 && cargoLevel <= 10000) {
            fuel.innerHTML = "Fuel level too low for launch";
            cargo.innerHTML = "Cargo mass low enough for launch"    
        } else if (fuelLevel<=10000){ 
        faultyItems.style.visibility="visible"
        fuel.innerHTML="There is not enough fuel for Launch";
        cargo.innerHTML="Cargo mass low enough for Launch";
        launchStatus.innerHTML="Shuttle not ready for Launch";
        launchStatus.style.color="#FF0000";
        } else if (cargoLevel>=10000) {
        faultyItems.style.visibility="visible";
        fuel.innerHTML="Fuel level high enough for Launch";
        cargo.innerHTML="Cargo mass is too large for Launch";
        launchStatus.innerHTML="Shuttle not ready for Launch";
        launchStatus.style.color="#FF0000";
        } else {
        fuel.innerHTML="Fuel level high enough for Launch";
        cargo.innerHTML="Cargo mass is low enough for Launch";
        launchStatus.innerHTML="Shuttle is ready for launch";
        launchStatus.style.color="#00FF00";
    }
}
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            if (response.status >= 400) {
                throw new Error ("Bad response");
            }
            else {
                return response.json();
            }
        });

    return planetsReturned;
}



function pickPlanet(planets) {
    let index = Math.floor(Math.random()*planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;