const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createAccounts: async (user_id, bank_name, bank_account_number, ballance) => {
        try {
            const existAccount = await prisma.bankaccounts.findUnique({ where: { user_id } });
            if (existAccount) throw 'account sudah terdaftar';

            let accounts = await prisma.bankaccounts.create({
                data: {
                    user_id,
                    bank_name,
                    bank_account_number,
                    ballance,
                },
            });
            return accounts;
        } catch (err) {
            throw err;
        }
    },


    //get all accounts
    getAllAccounts: async () => {
        try {
       
       const accounts = await prisma.bankaccounts.findMany({
         select: {
            id:true,
            user_id: true,
            bank_name: true,
            bank_account_number: true,
            ballance: true,
         },

       });      
         return accounts;
       } catch (err) {
           throw err;
       }
   },

    // getAccountsById
    getAccountsById: async (id) => {
        try {
            const accounts = await prisma.bankaccounts.findUnique({ where: { id } });
            if (!accounts) throw 'accounts tidak ditemukan';

            return accounts;
        } catch (err) {
            throw err;
        }
    }

};
