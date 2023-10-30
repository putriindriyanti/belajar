const { createAccounts, getAllAccounts, getAccountsById} = require('../libs/accounts.libs');

module.exports = {
    // create new account
    createAccounts: async (req, res, next) => {
        try {
          let { user_id, bank_name, bank_account_number, ballance  } = req.body;
            try{
                let accounts = await createAccounts (user_id, bank_name, bank_account_number, ballance);

                return res.status(201).json({
                    status: true,
                    message: 'OK',
                    data: accounts
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


    //get all accounts
    getAllAccounts: async (req, res, next) => {
        try {
            // Mengambil semua data account
            let accounts = await getAllAccounts();
    
            return res.status(200).json({
                status: true,
                message: 'OK',
                data: accounts
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message:   err.message,
                data: null
            });
        };
    },


    getAccountsById: async (req, res, next) => {
        try {
            const { id } = req.params;
            let accounts;
    
            try {
                accounts = await getAccountsById(Number(id));
                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: accounts
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message:  err, 
                    data: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
};    