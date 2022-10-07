const permissions = {
  DEAN: {
    users: ['write:self', 'read:self', 'read:others'],
    grievances: [],
    answers: [],
    votes: []
  },
  STUDENT: {
    users: [],
    grievances: []
  },
  PERSONNEL: {
    users: [],
    grievances: []
  }
}

module.exports = permissions
