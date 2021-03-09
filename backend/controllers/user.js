const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  console.log('adding user');
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: hash,
    });
    console.log('saving user');
    console.log(user);
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: 'User added successfully!',
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: new Error('User not added'),
        });
      });
  });
};

exports.login = (req, res, next) => {
  console.log('logging in');
  console.log({ email: req.body.email });
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found!'),
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!'),
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'ljfbfsvdbjxzliuymnw2130lwkendv',
            {
              expiresIn: '24h',
            },
          );
          res.status(200).json({
            userId: user._id,
            token: token,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getOneUser = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error,
      });
    });
};

exports.modifyUser = (req, res, next) => {
  console.log('modifying user');
  const userId = req.params.id;

  const host = req.protocol + '://' + req.get('host');

  let newObj = {};

  // Picture has changed
  if (image) {
    // if (req?.body?.sauce) {
    const parsedData = JSON.parse(req.body.user);
    const imageUrl = host + '/images/' + req.file.filename;
    newObj = {
      firstName: parsedData.firstName,
      lastName: parsedData.lastName,
      department: parsedData.department,
      jobTitle: parsedData.jobTitle,
      country: parsedData.country,
      imageUrl,
    };

    // Picture hasn't changed
  } else {
    newObj = { ...req.body };
  }

  Sauce.findByIdAndUpdate(
    { _id: userId },
    { ...newObj },
    (err, updatedUser) => {
      if (err) {
        console.log('ERROR');
      } else {
        res.status(201).json({
          message: 'User successfully modified!',
        });
      }
    },
  );
};

// get('/', auth, userCtrl.getMenuOptions);
