const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //create users
    createUsers: async (name, email, password ) => {
        try {
            const existUser = await prisma.users.findUnique({ where: { email} });
            if (existUser) throw 'email sudah dipakai';

            let users = await prisma.users.create({
                data: {
                  name,
                  email,
                  password
                },
              });
            return users;
            
        } catch (err) {
            throw err;
        }
    },

    //get all users
    getAllUsers: async () => {
       try {
      
      const users = await prisma.users.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          password: true
        },
      });      
        return users;
      } catch (err) {
          throw err;
      }
  },


  //getUserById
  getUserById: async (id) => {
    try {
        const users = await prisma.users.findUnique({ where: { id } });
        if (!users) throw 'user tidak ditemukan';

        return users;
    } catch (err) {
        throw err;
    }
},

};


