exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You Have Access To The Private Data In This Route",
  });
};
