import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
export const postData=async(url,formData)=>{
    try{
        
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

// for get data from backend
export const fetchDataFromApi=async (url)=>{
    try{
        const{data}=await axios.get(apiUrl+url,{
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json',
        },);
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}