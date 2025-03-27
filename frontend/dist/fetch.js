var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BASE_URL } from "./config.js";
function Get(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = BASE_URL + endpoint;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return yield response.json();
        }
        catch (error) {
            console.error("Error posting data:", error);
        }
    });
}
function Post(endpoint, bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = BASE_URL + endpoint;
            const response = yield fetch(url, {
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
            const data = yield response.json();
            console.log(response);
            return data;
        }
        catch (error) {
            console.error("Error posting data:", error);
        }
    });
}
function Put(endpoint, bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = BASE_URL + endpoint;
            const response = yield fetch(url, {
                method: "PUT",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: bodyData,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            // console.log(data);
            return data;
        }
        catch (error) {
            console.error("Error posting data:", error);
        }
    });
}
function Delete(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let url = BASE_URL + endpoint;
            const response = yield fetch(url, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            // console.log(data);
            return data;
        }
        catch (error) {
            console.error("Error posting data:", error);
        }
    });
}
export { Get, Post, Put, Delete };
//# sourceMappingURL=fetch.js.map