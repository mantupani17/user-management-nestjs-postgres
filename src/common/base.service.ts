interface BaseServiceI {
  create: (data: any) => any
  findAll: (a, b, c, d, e) => any
  findOne: (a) => any
  update: (a, b) => any
  remove: (a) => any
}

export class BaseService implements BaseServiceI {
  moduleRepository: any = null
  constructor(Model: any) {
    this.moduleRepository = Model
  }

  create(createModuleDto) {
    return this.moduleRepository.save(createModuleDto)
  }

  findAll(cond, select, limit, offset, sort) {
    return this.moduleRepository.find({
      where: cond,
      select: select,
      order: sort,
      skip: offset,
      take: limit,
    })
  }

  findOne(id: number) {
    return this.moduleRepository.findOne({
      where: { id: id },
    })
  }

  update(id: number, updateModuleDto) {
    return this.moduleRepository.update({ id: id }, updateModuleDto)
  }

  remove(id: number) {
    return this.moduleRepository.delete({ id: id })
  }

  findOneByCond(cond: any) {
    return this.moduleRepository.findOne({
      where: cond,
    })
  }

  updateByCond(cond, updateModuleDto) {
    return this.moduleRepository.update(cond, updateModuleDto)
  }
}
