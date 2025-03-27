
import { BASE_URL } from "./config.js";
async function Get(endpoint: string) {
    try {
        let url = BASE_URL + endpoint;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
async function Post(endpoint: string, bodyData?: any) {
    try {
        let url = BASE_URL + endpoint;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token') || '',
            },
            body: bodyData,
        });
        console.log(bodyData.get('cart'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(response);
        return data;
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
async function Put(endpoint: string, bodyData?: any) {
    try {
        let url = BASE_URL + endpoint;
        const response = await fetch(url, {
            method: "PUT",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            body: bodyData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error posting data:", error);
    }
}
async function Delete(endpoint: string) {
    try {
        let url = BASE_URL + endpoint;
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error("Error posting data:", error);
    }
}



export { Get, Post, Put, Delete }