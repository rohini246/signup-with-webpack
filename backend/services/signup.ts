import bcrypt from 'bcryptjs';
import { findUser, saveUser, updateUser } from "../repo/user";
import { Status } from "../constants/status";
import { Message } from "../constants/message";
import { IupdateUser, IuserSignup } from "../models/user";
import { CLIENT_RENEG_LIMIT } from 'tls';

export interface IUser {
    name: string,
    email: string,
    address: string,
    password: string
}
export const signService = async (data: IuserSignup) => {
    const userExist = await findUser(data.email);
    console.log("userExist", userExist[0]);
    let message: string;
    message = Message.userAlreadyRegistered;
    let status = Status.conflict;
    if (!userExist[0]) {
        const hashedValue = await bcrypt.hash(data.password, 10)
        await saveUser(data, hashedValue);
        message = "Successfully Registered.";
        status = 201;
    }
    return { message, status };
}

export const updateService = async (data: IupdateUser) => {
    const userExist = await findUser(data.email);
    if (!userExist[0]) {
        return { message: Message.notExist, status: Status.notExist }
    }
    else {
        console.log(data.address,"user");   
        await updateUser(data.email, "address", data.address)
        return { message: Message.successfullyUpdatedInDb, status: Status.success }
    }
}


