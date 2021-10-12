require("dotenv").config();
const fetch = require("node-fetch");

const { BUTTONDOWN_TOKEN } = process.env;

exports.handler = async (event) => {
  const email = JSON.parse(event.body).email;

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  try {
    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${BUTTONDOWN_TOKEN}`,
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Something went wrong!" }),
    };
  }
};
