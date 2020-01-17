const checkFor = (prop) => (req, res, next) => {
    req.body[prop] ? next() : res.status(400).json( { errorMessage: `required ${prop}`});
  }
  router.post('/', checkFor('project'), (req, res) => {
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log (error);
      res.status(500).json();
    })
  })