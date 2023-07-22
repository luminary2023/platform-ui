import axios from "axios";

export const loginRequest = async (data: any) => {
  try{
    const res = await axios.post('url', data);
    return res;
  } catch(error) {
    throw(error)
  }
}
