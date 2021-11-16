const axios = require("axios");

const api = axios.create({ baseURL: "http://api.positionstack.com/v1" });

exports.getForwardGeocoding = async (address) => {
  const data = await api.get("/forward", {
    params: {
      access_key: process.env.POSITIONSTACK_API_KEY,
      query: address,
      output: "json",
    },
  });

  return data.data.data;
};
