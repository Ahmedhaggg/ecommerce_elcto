const BaseQueryBuider = require("./BaseQueryBuilder");

module.exports = class ProductQueryBuilder extends BaseQueryBuider {
    setTitle(title) {
        if (title)
            this.query.title = { $regex: '.*' + title + '.*' };
    }
    setCateoryId(categoryId) {
        if (categoryId)
            this.query.category = categoryId;
    } 
}