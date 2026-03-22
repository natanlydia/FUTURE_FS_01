import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const {
  PORT = 3001,
  CORS_ORIGIN = "http://localhost:5173,http://localhost:8080,http://localhost:8081",
  MONGO_URI,
  MONGO_DB_NAME = "portfolio",
  CONTACT_COLLECTION = "contact_messages",
  EMAIL_SERVICE = "gmail",
  EMAIL_HOST,
  EMAIL_PORT = 587,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TLS_REJECT_UNAUTHORIZED = "true",
  EMAIL_FROM = EMAIL_USER,
  EMAIL_TO = "natanasnu19@gmail.com"
} = process.env;

if (!MONGO_URI) {
  console.warn("Missing MONGO_URI environment variable. The API will fail until it is set.");
}

if (!EMAIL_USER || !EMAIL_PASS) {
  console.warn("Missing EMAIL_USER or EMAIL_PASS. Email sending will fail until they are set.");
}

const allowedOrigins = CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS.`));
    }
  })
);
app.use(express.json({ limit: "200kb" }));

const mongoClient = MONGO_URI ? new MongoClient(MONGO_URI) : null;
let collectionPromise;
let mailerPromise;
const rejectUnauthorized = EMAIL_TLS_REJECT_UNAUTHORIZED !== "false";

const getEmailErrorMessage = (error) => {
  if (error?.code === "EAUTH") {
    if (String(EMAIL_SERVICE).toLowerCase() === "gmail") {
      return "Gmail rejected the login. Set EMAIL_USER to your Gmail address and EMAIL_PASS to a valid 16-character Google App Password.";
    }

    return "The SMTP server rejected the login. Check EMAIL_USER and EMAIL_PASS.";
  }

  return error?.message || "Email delivery failed.";
};

const createMailer = () => {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email transport is not configured. Set EMAIL_USER and EMAIL_PASS.");
  }

  if (EMAIL_SERVICE) {
    return nodemailer.createTransport({
      service: EMAIL_SERVICE,
      tls: {
        rejectUnauthorized
      },
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }

  if (!EMAIL_HOST) {
    throw new Error("EMAIL_HOST is required when EMAIL_SERVICE is not set.");
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    tls: {
      rejectUnauthorized
    },
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
};

const getMailer = async () => {
  if (!mailerPromise) {
    const mailer = createMailer();

    mailerPromise = mailer.verify().then(() => {
      console.log(`Email transport verified for ${EMAIL_USER}.`);
      if (!rejectUnauthorized) {
        console.warn("Email TLS certificate verification is disabled for local development.");
      }
      return mailer;
    }).catch((error) => {
      mailerPromise = undefined;
      console.error("Email transport verification failed:", {
        message: error.message,
        hint: getEmailErrorMessage(error),
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      });
      throw error;
    });
  }

  return mailerPromise;
};

const getCollection = async () => {
  if (!mongoClient) {
    throw new Error("MongoDB is not configured. Set MONGO_URI.");
  }

  if (!collectionPromise) {
    collectionPromise = mongoClient.connect().then((client) => {
      const db = client.db(MONGO_DB_NAME);
      return db.collection(CONTACT_COLLECTION);
    });
  }

  return collectionPromise;
};

const sendNotificationEmail = async ({ name, email, message }) => {
  const mailer = await getMailer();

  return mailer.sendMail({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    replyTo: email,
    subject: "New Contact Form Submission",
    text: `New message from your portfolio:

Name: ${name}
Email: ${email}

Message:
${message}`
  });
};

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  const trimmedName = name?.trim();
  const trimmedEmail = email?.trim();
  const trimmedMessage = message?.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }

  try {
    const contactCollection = await getCollection();
    const insertResult = await contactCollection.insertOne({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      createdAt: new Date()
    });

    try {
      await sendNotificationEmail({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage
      });
    } catch (emailError) {
      console.error("Contact email delivery failed:", {
        message: emailError.message,
        hint: getEmailErrorMessage(emailError),
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode
      });

      return res.status(202).json({
        ok: true,
        id: insertResult.insertedId,
        emailSent: false,
        warning: getEmailErrorMessage(emailError)
      });
    }

    return res.status(200).json({
      ok: true,
      id: insertResult.insertedId,
      emailSent: true
    });
  } catch (error) {
    console.error("Contact submission failed:", error);
    return res.status(500).json({ error: "Failed to submit message." });
  }
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Contact API running on http://localhost:${PORT}`);
});
