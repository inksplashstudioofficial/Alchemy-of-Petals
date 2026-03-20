import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Load credentials from .env
const INSTAMOJO_API_KEY = process.env.INSTAMOJO_API_KEY || 'test_api_key';
const INSTAMOJO_AUTH_TOKEN = process.env.INSTAMOJO_AUTH_TOKEN || 'test_auth_token';

// For testing, use test.instamojo.com. For live, use www.instamojo.com
const INSTAMOJO_URL = 'https://test.instamojo.com/api/1.1/payment-requests/';

app.post('/create-payment', async (req, res) => {
  try {
    const { amount, purpose, buyer_name, email, phone, redirect_base } = req.body;
    
    // Automatically construct return URL so it perfectly matches wherever the user launched the app from
    const redirectUrl = redirect_base 
      ? `${redirect_base}?payment_id={payment_id}&payment_status={payment_status}&payment=success` 
      : 'http://127.0.0.1:5500/index.html?payment=success';

    // Use URLSearchParams to structure payload exactly as Instamojo expects
    const payload = new URLSearchParams({
      purpose: purpose || 'Alchemy of Petals Order',
      amount: amount,
      buyer_name: buyer_name || 'Customer',
      email: email || 'inbox.alchemyofpetals@gmail.com',
      redirect_url: redirectUrl, 
      send_email: 'false',
      send_sms: 'false',
      allow_repeated_payments: 'false',
    });

    if (phone) {
      payload.append('phone', phone);
    }

    const response = await axios.post(INSTAMOJO_URL, payload, {
      headers: {
        'X-Api-Key': INSTAMOJO_API_KEY,
        'X-Auth-Token': INSTAMOJO_AUTH_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data.success) {
      res.json({
        success: true,
        payment_request_url: response.data.payment_request.longurl
      });
    } else {
      res.status(400).json({ success: false, message: 'Instamojo Error', details: response.data });
    }
  } catch (error) {
    console.error('Payment creation failed:', error?.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Error generating payment link' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[Alchemy of Petals] Checkout server running! Listening on port ${PORT}`);
});
