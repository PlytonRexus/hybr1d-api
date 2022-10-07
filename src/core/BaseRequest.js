class BaseRequest {
  static createSearchQuery (q) {
    const mongoQuery = {}
    if (q.name) {
      mongoQuery.name = {
        $regex: new RegExp(q.name.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.admissionNumber) {
      mongoQuery.admissionNumber = {
        $regex: new RegExp(q.admno.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.city) {
      mongoQuery.city = {
        $regex: new RegExp(q.city.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.state) {
      mongoQuery.state = {
        $regex: new RegExp(q.state.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.sex) {
      mongoQuery.sex = {
        $regex: new RegExp(q.sex.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.house) {
      mongoQuery.house = {
        $regex: new RegExp(q.house.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.department) {
      mongoQuery.department = {
        $regex: new RegExp(q.department.toString().toLowerCase()),
        $options: 'i'
      }
    }

    if (q.club) {
      mongoQuery.clubs = {
        $regex: new RegExp(q.club.toString().toLowerCase()),
        $options: 'i'
      }
    }

    return mongoQuery
  }

  static handlePaging (skip, limit) {
    return {
      skip: parseInt(skip) || 0,
      limit: parseInt(limit) || null
    }
  }
}

module.exports = BaseRequest
