import { useEffect, useState } from "react";
import "./AdminUI.css";
import { signs, months } from "./consts";

import { createEventMiddleware } from "./api";

const AdminUI = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSign, setSelectedSign] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [response, setResponse] = useState({ message: "" });

  const handleSubmit = async () => {
    console.log(selectedTime);
    const date = new Date(
      `${selectedDate}T${selectedTime.split(":")[0]}:00:00Z`
    );
    const offsettedTime = date.getTime() - 390 * 60 * 1000;
    const time = Math.floor(offsettedTime / 1000);
    console.log(date.toTimeString());
    const submitResp = await createEventMiddleware({
      time,
      sign: selectedSign,
      month: selectedMonth,
    });

    setResponse(submitResp);
  };

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      if (response.message !== "") setResponse({ message: "" });
    }, 2000);

    return () => clearTimeout(timeoutID);
  }, [response]);

  return (
    <div className="admin-ui">
      <h2>Admin UI</h2>
      <div className="form-group">
        <label htmlFor="date">Select a Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Select Time (24h format):</label>
        <input
          type="time"
          id="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          step="3600"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="sign">Select a Sign:</label>
        <select
          id="sign"
          value={selectedSign}
          onChange={(e) => setSelectedSign(e.target.value)}
          required
        >
          <option value="">--Choose a Sign--</option>
          {signs.map((sign, index) => (
            <option key={index} value={sign}>
              {sign}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="month">Select a Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          required
        >
          <option value="">--Choose a Month--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="summary">
        <h3>Selected Values:</h3>
        <p>Date: {selectedDate || "None"}</p>
        <p>Time: {selectedTime || "None"}</p>
        <p>Sign: {selectedSign || "None"}</p>
        <p>Month: {selectedMonth || "None"}</p>
        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {response.message.length ? (
          <p>Submit Status : {response.message}</p>
        ) : null}
      </div>
    </div>
  );
};

export default AdminUI;
