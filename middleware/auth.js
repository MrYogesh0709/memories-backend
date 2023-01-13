import jwt from "jsonwebtoken";

//wants to like posts
//click the like button => auth middleware (next)=> like controller...

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT);
      // console.log(decodedData);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      // console.log(decodedData);
      req.userId = decodedData?.sub;
      // console.log(req.userId);
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default auth;
