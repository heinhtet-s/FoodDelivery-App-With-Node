export const GenerateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 900000);
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountSid = "AC447df969d59ad8613d2d84835d21cf7f";
  const authToken = "f0e72870679592912ca3c559fa0e12e5";
  const client = require("twilio")(accountSid, authToken);
  console.log(client);
  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "+43720",
    to: `${toPhoneNumber}`, // recipient phone number // Add country before the number
  });
  console.log(response);
  return response;
};
