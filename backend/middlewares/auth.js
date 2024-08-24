import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

function verifyRequest(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send("Unauthorised");
      }
      next();
    });
  } else {
    res.status(403).send("Forbidden");
  }
}

function isUser(req, res, next) {
  const token = req.cookies.token;
  // console.log(token)
  if (token) {
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send("Unauthorised");
        return;
      }
      if (result.role != "USER") {
        res.status(401).send("Unauthorised");
        return;
      }
      req.user = result;
      next();
    });
  } else {
    res.status(403).send("Forbidden");
  }
}

function isServiceperson(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(401).send("Unauthorised");
        return;
      }
      if (result.role != "SERVICEPERSON") {
        res.status(401).send("Not a serviceperson");
        return;
      }
      req.serviceperson = result;
      next();
    });
  } else {
    res.status(403).send("Forbidden");
  }
}

export { verifyRequest, isUser, isServiceperson };
