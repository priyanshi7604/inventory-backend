// require("dotenv").config();
// require("./config/db.conn");
// const express = require("express");
// const app = express();
// const fs = require('fs');
// const cors = require('cors');
// const path = require('path');

// // const puppeteer = require('puppeteer');
// // app.use(bodyParser.json());

// // Handle error
// const errorHandler = require("./middleware/errorhandler.middleware");

// app.use(require('cors'));  //({ origin: '*' })
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Contain all routes
// app.use("/api", require("./routers/index"));

// // app.use("/uploads", express.static("uploads"));.
// app.use("/uploads", express.static("uploads"))


// // Handle error which come from the any routes
// app.use(errorHandler);

// const pdfDir = path.join(__dirname, "generated-pdfs");
// if (!fs.existsSync(pdfDir)) {
//     fs.mkdirSync(pdfDir);
// }
// app.use("/invoice", express.static(path.join(__dirname, "controllers/invoice/generated-pdfs")));

// app.use('/images', express.static(path.join(__dirname, 'images')));


// // Listen to the port
// app.listen(process.env.PORT, () => {
//     console.log(`🚀 SERVER RUNNING ON PORT: ${process.env.PORT} 🚀`);
// });

// // Use CORS
// app.use(cors({
//     origin: ['http://localhost:3000'], // allow your frontend dev origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

require("dotenv").config();
require("./config/db.conn");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const app = express();

// ✅ CORS MUST BE FIRST
// const corsOptions = {
//     origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:4000"],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
// };

app.use(cors({
    origin: "*",  // ✅ allow all origins
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));


// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Routes
app.use("/api", require("./routers/index"));

// ✅ Static files
app.use("/uploads", express.static("uploads"));
app.use("/invoice", express.static(path.join(__dirname, "controllers/invoice/generated-pdfs")));
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Error handler
const errorHandler = require("./middleware/errorhandler.middleware");
app.use(errorHandler);

// ✅ Ensure PDF dir exists
const pdfDir = path.join(__dirname, "generated-pdfs");
if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
}

// ✅ Start server
app.listen(process.env.PORT, () => {
    console.log(`🚀 SERVER RUNNING ON PORT: ${process.env.PORT} 🚀`);
});
