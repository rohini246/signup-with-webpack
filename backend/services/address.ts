import { Message } from "../constants/message";
import { Status } from "../constants/status";
import { findCountryId, findStatesOfCountry, findStateId, findCityOfStates, findCityId, findZipOfCity } from "../repo/address";

export const statesDataService = async (country: string) => {
    let message: string = '';
    let status = 0;
    let statesArray: string[] = [];
    console.log(country);
    const id = await findCountryId(country.toLowerCase());
    if (!id[0]) {
        console.log(!id[0]);
        message = Message.notExist;
        status = Status.notExist;
        return { message, status };
    }
    else {
        console.log('in else loop')
        const states = await findStatesOfCountry(id[0].id);
        for (let state of states) {
            statesArray.push(state.state);
        }
        message = Message.successfullySentDetails;
        status = Status.success;

        console.log(statesArray);
        return { message, status, statesArray }
    }
}


export const cityDataService = async (state: string) => {
    let message: string = '';
    let status = 0;
    let cityArray: string[] = [];
    console.log(state);
    const id = await findStateId(state.toLowerCase());
    if (!id[0]) {
        message = Message.notExist;
        status = Status.notExist;
    }
    else {
        const cities = await findCityOfStates(id[0].id);
        for (let city of cities) {
            cityArray.push(city.city);
        }
        message = Message.successfullySentDetails;
        status = Status.success;
    }
    return { message, status, cityArray }
}

export const zipDataService = async (city: string) => {
    let message: string = '';
    let status = 0;
    let zip = 0;
    console.log(city);
    const id = await findCityId(city.toLowerCase());
    if (!id[0]) {
        message = Message.notExist;
        status = Status.notExist;
        return { message, status, };
    }
    else {
        const zipCode = await findZipOfCity(id[0].id);
        message = Message.successfullySentDetails;
        status = Status.success;
        zip = zipCode[0].zip;
        console.log(zip);
    }
    return { message, status, zip }
}