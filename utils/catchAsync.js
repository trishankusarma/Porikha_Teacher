module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// SAME AS
// module.exports = fn => {
//   return (req,res,next) => {
//     fn(req, res, next).catch(next);
//   };
// };
