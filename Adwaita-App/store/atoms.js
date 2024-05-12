import { atom } from "recoil";

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: undefined, // default value (aka initial value)
  });

export const habitState = atom({
    key: 'habitState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });


export const profileState = atom({
  key: 'profileState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});