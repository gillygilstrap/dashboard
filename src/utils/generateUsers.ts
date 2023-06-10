import { standardDateFormat } from "../constants";
import userDataJson from "../userData.json";

import moment from "moment";

interface Location {
  city: string;
  state: string;
  country: string;
  zipcode: number;
  houseNumber: number;
  street: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  email: string;
  dob: string;
  age: number;
  location: Location;
  picture: Picture;
  registeredDate: string
}

export const generateUsers = (): User[] => {
  const usersRaw = JSON.parse(JSON.stringify(userDataJson));

  // console.log(usersRaw)

  const users: User[] = usersRaw.map((u: any) => {
    const user = u.results[0];

    return {
      firstName: user.name.first,
      lastName: user.name.last,
      username: user.login.username,
      gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
      email: user.email,
      dob: moment(user.dob.date).format(standardDateFormat),
      age:
        Number(moment(Date.now()).format(`YYYY`)) -
        Number(moment(user.dob.date).format(`YYYY`)),
      location: {
        city: user.location.city as string,
        state: user.location.state as string,
        country: user.location.country as string,
        zipcode: user.location.postcode as string,
        houseNumber: user.location.street.number as string,
        street: user.location.street.name as string,
      },
      picture: {
        large: user.picture.large as string,
        medium: user.picture.medium as string,
        thumbnail: user.picture.thumbnail as string,
      },
      registeredDate: moment(user.registered.date).format(standardDateFormat)
    };
  });


  return users;
};
