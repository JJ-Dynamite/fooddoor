import { ApiConstants } from '../constants'
import axios from 'axios'
import { authHeader } from '../utils/Generator'
import { getToken } from '../../Store'

const getOrders = async () => {
  console.log(`OrderService | getOrders`);
  try {
    let response = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ORDER}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Order data fetched`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Order data not found`,
    };
  }
};

const addOrder = async ({foodId}) => {
  console.log(`OrderService | addOrder`);
  try {
    let response = await axios.post(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ORDER}/${foodId}`,
      {},
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Order added successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order adding failed`,
      };
    }
  } catch (error) {
    console.log(error?.response);
    return {
      status: false,
      message: `Order adding failed`,
    };
  }
};

const removeOrder = async ({foodId}) => {
  console.log(`OrderService | removeOrder`);
  try {
    let response = await axios.delete(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ORDER}/${foodId}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (response?.status === 200) {
      return {
        status: true,
        message: `Order removed successfully`,
        data: response?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Order removing failed`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Order removing failed`,
    };
  }
};

export default {
	getOrders,
	addOrder,
	removeOrder,
}
