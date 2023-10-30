const { createTransactions, getAllTransactions, getTransactionsById } = require('../libs/transactions.libs');

module.exports = {
  createTransactions: async (req, res, next) => {
    try {
      let { source_account_id, destination_account_id, amount } = req.body;

      try {
        let transactions = await createTransactions(source_account_id, destination_account_id, amount);

        return res.status(201).json({
          status: false,
          message: 'OK',
          data: transactions
        });
      } catch (err) {
        return res.status(400).json({
          status: false,
          message: err.message,
          data: null
        });
      }
    } catch (err) {
      next(err);
    }
  },

  getAllTransactions: async (req, res, next) => {
    try {
        // Mengambil semua data transaksi
        let transactions = await getAllTransactions();

        return res.status(200).json({
            status: true,
            message: 'OK',
            data: transactions
        });
    } catch (err) {
        return res.status(400).json({
            status: false,
            message: err.message,
            data: null
        });
    };
},

  getTransactionsById: async (req, res, next) => {
    try {
      let { id } = req.params;
      try {
        let transactions = await getTransactionsById(Number(id));

        return res.status(200).json({
          status: false,
          message: 'OK',
          data: transactions
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