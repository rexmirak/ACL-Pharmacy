import React, { useState } from "react";
import axios from 'axios';

const ResetPasswordPatient = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData);
      const response = await axios.put("http://localhost:8000/verify");

      // Handle the response as needed
      console.log(response);
      window.alert(response.statusText);
      if (response.status == 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log("not here el mfrod");
      window.alert("Error submitting form:", error);
    }
  };

  const requestOTP = async (event) => {
    console.log("f1");
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/requestOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      console.log({ email: formData.email });
      // Handle the response as needed
      window.alert(response.statusText);
      if (response.status == 200) {
      }
    } catch (error) {
      console.log("here");
      window.alert("Error submitting form:", error);
    }
  };

  return (
    <div>
      <br></br>
      <form onSubmit={requestOTP}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Request OTP</button>
      </form>
      <br />
      <form action="/verify" onSubmit={handleSubmit}>
        <label>
          OTP:
          <input
            type="text"
            name="otp"
            required
            value={formData.otp}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          New Password:
          <input
            type="password"
            name="newPassword"
            required
            value={formData.newPassword}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordPatient;
