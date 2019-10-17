const express = require('express');

//auth
const bcrypt = require('bcryptjs');
const createToken = require('../auth/config/createToken')

//database
const usersModel = require('../auth/users-model');

const restricted = require('../auth/config/restricted-middleware')

const router = express.Router();



router.post('/register', (req, res) => {
	const user = req.body;

	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	if (!user.password || !user.username || !user.department) {
		res.status(400).json({ message: 'password, username, and department are required fields' })
	}
	else {
		usersModel.add(user)
			.then(dbRes => {
				res.status(201).json(user)
			})
			.catch(err => {
				res.status(500).json({ message: 'user could not be added to database', err })
			})
	}

})

router.post('/login', (req, res) => {
	const {username, password} = req.body

	usersModel.getBy( {username} )
	.then(user => {
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = createToken(user)
			res.status(200).json({
				message: `Welcome ${user.username}!`,
				token
			});
		} else {
			res.status(401).json({ message: 'Invalid Credentials' });
		}
	})
	.catch(error => {
		res.status(500).json({message: "could not login user", error});
	});
});

router.use(restricted)

router.get('/', (req, res) => {
	usersModel.get()
		.then(users => {
			res.status(200).json(users)
		})
		.catch(err => {
			res.status(500).json({ message: 'could not get users', err })
		})
})

module.exports = router;