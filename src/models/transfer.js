const { prisma } = require('../services/prisma');

class Transfer {
  self = null;

  constructor(instance) {
    this.self = instance;
  }

  static async init(id) {
    const transfer = await prisma.transferRequest.findFirst({
      where: {
        id: id,
      },
    });

    if (!transfer) {
      return null;
    }

    return new Transfer(transfer);
  }

  async findAll(findAllArgs) {
    return await prisma.transferRequest.findMany(findAllArgs);
  }

  async fineOne(fineOneArgs) {
    return await prisma.transferRequest.findFirst(fineOneArgs);
  }

  async create(createArgs) {
    return await prisma.transferRequest.create(createArgs);
  }
}

module.exports = Transfer;
