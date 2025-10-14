import axios from 'axios';

export const postData=async(url,formData)=>{
    try{
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(apiUrl+url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const result = await response.json();
        return result;  // important
    }catch(err){
        console.log(err);
    }
}