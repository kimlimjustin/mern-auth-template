import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoAES from "crypto-js/aes";

const SECURITY_KEY = process.env.REACT_APP_SECURITY_KEY;

const parseQueryVariable = (variable, search) => {
    var query = search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null
}

const encryptFetchingData = data => {
    const encrypted = CryptoAES.encrypt(JSON.stringify(data), SECURITY_KEY);
    return encrypted.toString();
}

const OAuth = ({location}) => {
    const [error, setError] = useState('');
    useEffect(() => {
        if(location.search){
            const code = parseQueryVariable('code',location.search)
            console.log(code)
            if(code){
                axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/oauth`, {data: encryptFetchingData({code})}, {withCredentials: true})
                .then(response => {
                    if(response) window.location = "/"
                })
                .catch(err => {
                    console.log(err.response.data)
                    if(err.response.data.status === "001"){
                        setError("The email of your OAuth has been registered but not linked to your OAuth. Please try with another Email or OAuth.")
                    }else if(err.response.data.status === "000"){
                        setError("Access Token Required.")
                    }
                })
            }
        }
    }, [location.search])
    return(
        <>
        {!error?
        <h1>Loading...</h1>
        :<h3 className="form-error">{error}</h3>}
        </>
    )
}

export default OAuth;