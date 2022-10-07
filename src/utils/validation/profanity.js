module.exports = {
    clean: function (str, action = 'clean') {
        const filter = new (require('bad-words'))()
        if (!!str && str instanceof Array) { str = str.map((s) => filter[action](s)) }
        else if (!!str && typeof str === 'string') { str = filter[action](str) }
        else {
            throw BaseExceptionHandler(
                new InternalServerException({
                    message: 'Incompatible type supplied',
                    critical: false
                })
            )
        }
        return str
    },

    isClean: str => {
        if (!!str && str instanceof Array) {
            str = str.map((s) => !filter.isProfane(str))
            return str.every(v => v)
        } else if (!!str && typeof str === 'string') {
            return !filter.isProfane(str)
        }

        throw BaseExceptionHandler(
            new InternalServerException({
                message: 'Incompatible type supplied',
                critical: false
            })
        )
    }
}
