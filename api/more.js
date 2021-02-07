const fetch = require("node-fetch");

function extractNetlifySiteFromContext(context) {
  if (!context.clientContext || !context.clientContext.custom) {
    return "http://localhost:8888";
  }
  const data = context.clientContext.custom.netlify;
  const decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));

  return decoded.site_url;
}

exports.handler = async function (event, context) {
  const site = extractNetlifySiteFromContext(context);
  try {
    const data = await fetch(
      `${site}/data/${event["queryStringParameters"].page || 1}.json`,
    ).then((resp) => resp.json());

    return {
      statusCode: 200,
      body: JSON.stringify({ data: Array.isArray(data) ? data : [] }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "not ok", site }),
    };
  }
};
