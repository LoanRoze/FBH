export async function logMiddleware (req, res, next) {
  const date = new Intl.DateTimeFormat("fr-FR").format(new Date());
  console.log(
    `${date} - [${req.method}] ${req.url}${
      req.method === "GET" ? "" : "\n\t" + JSON.stringify(req.body)
    }`
  );
  next();
}