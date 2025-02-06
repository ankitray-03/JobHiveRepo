export const verificationMailTemplate = (OTP) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>OTP Verification</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <p class="otp">${OTP}</p>
        <p>Please use this OTP to complete your verification process. This OTP is valid for 10 minutes.</p>
        <div class="footer">
            <p>If you did not request this, please ignore this email.</p>
            <p>&copy; 2025 JobHive. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const verificationSuccessMailTemplate = (name) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .welcome {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome ${name}!</h2>
        <p>Congratulations! Your verification was successful.</p>
        <p class="welcome">We are excited to have you on board.</p>
        <p>Feel free to explore our services and make the most out of your experience.</p>
        <div class="footer">
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>&copy; 2025 JobHive. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const resetPasswordEmailTemplate = (RESET_LINK) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .reset {
            font-size: 18px;
            color: #333;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #fff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p class="reset">We received a request to reset your password. Click the button below to set a new password.</p>
        <a href=${RESET_LINK} class="button">Reset Password</a>
        <p class="reset">If you did not request a password reset, please ignore this email.</p>
        <div class="footer">
            <p>If you need further assistance, please contact our support team.</p>
            <p>&copy; 2025 JobHive. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export const resetPasswordSucessEmailTemplate = () => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .success {
            font-size: 18px;
            color: #333;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Successful</h2>
        <p class="success">Your password has been successfully reset. You can now log in with your new password.</p>
        <p>If you did not reset your password, please contact our support team immediately.</p>
        <div class="footer">
            <p>For any assistance, feel free to reach out to our support team.</p>
            <p>&copy; 2025 JobHive. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};
