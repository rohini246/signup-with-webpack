import { Request,Response } from "express";
import {statesDataService, cityDataService,zipDataService} from '../services/address';
export const address = async(req:Request,res:Response)=>{
  const data = req.body.country;
  const statesData = await  statesDataService(data);
  res.status(statesData.status).json({message:statesData.message,status:statesData.status, states:statesData.statesArray});
}

export const city = async(req:Request,res:Response)=>{
  const data = req.body.state;
  const cityData = await  cityDataService(data);
  res.status(cityData.status).json({message:cityData.message,status:cityData.status, cities:cityData.cityArray});
}

export const zip = async(req:Request,res:Response)=>{
  const data = req.body.city;
  const zipData = await  zipDataService(data);
  res.status(zipData.status).json({message:zipData.message,status:zipData.status, zip:zipData.zip});
}

