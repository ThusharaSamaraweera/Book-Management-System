import axios from "axios";
import { BASE_URL } from "../utils/restClient";

const config: any = {
  headers: {
    "Content-Type": "application/json",
  },
};

export default class authService {
  static async login(email: string, password: string) {
    const payload = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload, config);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  }

  static async signUp(name: string, email: string, password: string) {
    const payload = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload, config);
      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

