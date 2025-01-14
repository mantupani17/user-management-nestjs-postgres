interface BaseServiceI {
  create: (data: any) => any
  findAll: (a, b, c, d, e) => any
  findOne: (a) => any
  update: (a, b) => any
  remove: (a) => any
}

export class BaseService implements BaseServiceI {
  moduleRepository: any = null
  constructor(model: any) {
    this.moduleRepository = model
  }

  create(createModuleDto) {
    return this.moduleRepository.create(createModuleDto)
  }

  findAll(cond, select, opts = {}) {
    return this.moduleRepository.find(cond, select, opts)
  }

  findOne(id: any, select = {}) {
    return this.moduleRepository.findById(id, select)
  }

  update(id: any, updateModuleDto) {
    return this.moduleRepository.findByIdAndUpdate(id, updateModuleDto, {
      new: true,
    })
  }

  remove(id: any) {
    return this.moduleRepository.delete({ id: id })
  }

  findOneByCond(cond: any, select = {}) {
    return this.moduleRepository.findOne(cond, select)
  }

  updateByCond(cond, updateModuleDto) {
    return this.moduleRepository.update(cond, updateModuleDto)
  }

  aggregate(agg: any) {
    return this.moduleRepository.aggregate(agg)
  }
}
