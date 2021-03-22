import axios from "axios";
import CryptoAES from "crypto-js/aes";

const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY;

const encryptFetchingData = txt => {
    const encrypted = CryptoAES.encrypt(txt, SECURITY_KEY);
    return encrypted.toString();
}

const sendSecureRequest = async (method, url, data) => {
    if(method === "GET"){
        let res = null;
        axios.get(url, {data:encryptFetchingData(JSON.stringify(data))}, {withCredentials: true})
        .then(response => res = response)
        .catch(err => res = err)
        return res;
    }else if(method === "POST"){
        let res = null;
        axios.post(url, {data:encryptFetchingData(JSON.stringify(data))}, {withCredentials: true})
        .then(response => res = response)
        .then(err => res = {error: true, err})
        if(res && res.error) return new Error(res.err);
        else return res;
    }
}

export default sendSecureRequest;