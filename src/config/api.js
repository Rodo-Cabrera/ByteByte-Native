import { eShopApiUrl } from "./eShopApi";
import { productsEndpoints, userEndpoints } from "./endPoints";

// USERS APIS

export const getOneUser = async (token, id) => {
    try {
      return await eShopApiUrl.get(`${userEndpoints.getOneUser}/${id}`, {
        headers: {
          "access-token": token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

// PRODUCTS APIS


  export const getAllProd = async (token) => {
    try {
      return await eShopApiUrl.get(`${productsEndpoints.getAllProd}`, {
        headers: {
          "access-token": token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };