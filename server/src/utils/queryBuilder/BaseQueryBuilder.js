module.exports = class BaseQueryBuider {
    constructor() {
        this.query = {};
        this.limit = 10;
        this.offset = 0;
    }
    setLimit(limit = 10) {
        this.limit = limit;
    }
    setOffset(page = 1) {
        this.offset = (page - 1) * 10;
    }
    build() {
        return {
            query: this.query,
            offset: this.offset,
            limit: this.limit
        }
    }
}
