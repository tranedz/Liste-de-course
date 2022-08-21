import { input } from "../script.js";


export function inputSize() {
  if (input.value.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function limitCharacters() {
  if (input.value.length <= 30) {
    return true;
  } else {
    return false;
  }
}