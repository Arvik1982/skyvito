
import { accessToken, localHost  } from "../../vars/vars";

export default function uploadImage( file ) {

  console.log(file)
  const data = new FormData();
  console.log(data)
  data.append("file", file);

  return fetch(`${localHost}user/avatar`, {
    method: "POST",
    body: data,
    headers:{
      Authorization:`Bearer ${accessToken}`,
    }
  }).then((response) => {
    const resp = response.json()
    console.log(resp)
    return resp;
  }).catch((error)=>{ throw new Error(error)})
}