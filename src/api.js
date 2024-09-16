export const createEventMiddleware = async (eventData) => {
  const { time, date, sign, month } = eventData;

  const myanmarTime = new Date(`${date}T${time}:00Z`).getTime();
  const localTime = myanmarTime - 390 * 60 * 1000;
  const localUnixTime = localTime / 1000;

  const submitResult = await fetch("../.netlify/functions/createEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: localUnixTime,
      sign,
      month,
    }),
  }).then((resp) => resp.json());

  return submitResult;
};
