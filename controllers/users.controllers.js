const { createUsers, getAllUsers, getUserById} = require('../libs/users.libs');

module.exports = {
    // create new users
    createUsers: async (req, res, next) => {
        try {
          let { name, email, password } = req.body;
            try{
                let users = await createUsers (name, email, password);

                return res.status(201).json({
                    status: true,
                    message: 'OK',
                    data: users
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            next(err);
        }
    },
    
    //get all users
    getAllUsers: async (req, res, next) => {
        try {
            // Mengambil semua data pengguna
            let users = await getAllUsers();
    
            return res.status(200).json({
                status: true,
                message: 'OK',
                data: users
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err.message,
                data: null
            });
        };
    },

    //get user by id
    getUserById: async (req, res, next) => {
        try {
            let { id } = req.params;
            let users;
            try {
                users = await getUserById(Number(id));
                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: users
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            next(err);
        }
    }


};    