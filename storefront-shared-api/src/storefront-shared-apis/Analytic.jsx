import {FLITS_POST_ANALYTIC, getBaseURLAnalytic } from "../Services/FlitsAnalyticService";

export const analytic = {
  get_token: async function (data) {
    try {
      const endpoint = getBaseURLAnalytic();
      const headers = {
        "Content-Type": "application/json",
      };
      const param = {};
      const isCustom = true

      const response = await FLITS_POST_ANALYTIC(endpoint, JSON.stringify(data), param, headers, isCustom);
      const token = await response.json();
      return token;
    } catch (error) {
      console.log("token of analytic", error);
    }
  },
  analytic_push_data: async function (data, token) {
    try {
      const endpoint = getBaseURLAnalytic();
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const param = {};
      const isCustom = true

      const response = await FLITS_POST_ANALYTIC(endpoint, JSON.stringify(data), param, headers, isCustom);
      const status = await response.json();
      return status;
    } catch (error) {
      console.log("data status", error);
    }
  }
}