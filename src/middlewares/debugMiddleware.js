const debugMiddleware = (req, res, next) => {
    try {
      console.log('Headers', req.headers);
      console.log('Body', req.body);
      next();
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: e
      });
    }
  };
  
  export default debugMiddleware;
  