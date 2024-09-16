import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { months, signs } from "./consts";
import { createEventMiddleware } from "./api";

const eventSchema = yup
  .object({
    sign: yup.string().required("You must choose a sign"),
    month: yup.string().required("You must choose a month"),
    time: yup.string().required("You must choose an opening time"),
    date: yup.string().required("You must choose an opening date"),
  })
  .required();

export const AdminForm = () => {
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(eventSchema),
  });

  const handleSuccess = (data) => {
    createEventMiddleware(data);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const handleError = () => {
    setFirstSubmit(false);
  };

  return (
    <form
      className="admin-ui"
      onSubmit={handleSubmit(handleSuccess, handleError)}
    >
      {success && <p className="success-message">Event Created</p>}
      <h2>Admin UI</h2>
      <div className="form-group">
        <label htmlFor="date">Select a Date:</label>
        <input type="date" id="date" {...register("date")} />
        <p className="error-message">{errors.date?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="time">Select Time (24h format):</label>
        <input type="time" id="time" step={3600} {...register("time")} />
        <p className="error-message">{errors.time?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="sign">Select a Sign:</label>
        <select id="sign" {...register("sign")}>
          <option value="">--Choose a Sign--</option>
          {signs.map((sign, index) => (
            <option key={index} value={sign}>
              {sign}
            </option>
          ))}
        </select>
        <p className="error-message">{errors.sign?.message}</p>
      </div>
      <div className="form-group">
        <label htmlFor="month">Select a Month:</label>
        <select id="month" {...register("month")}>
          <option value="">--Choose a Month--</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <p className="error-message">{errors.month?.message}</p>
      </div>
      <input
        type="submit"
        value="Create Event"
        className="submit-btn"
        disabled={!firstSubmit && !(isDirty && isValid)}
      />
    </form>
  );
};
