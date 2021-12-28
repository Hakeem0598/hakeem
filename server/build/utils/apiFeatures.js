"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class ApiFeatures {
    constructor(model, queryString) {
        this.model = model;
        this.defaultQueryObject = {
            page: 0,
            limit: 48,
            fields: '-__v,-updatedAt',
            sort: '-createdAt'
        };
        this.queryObject = Object.assign(Object.assign({}, this.defaultQueryObject), queryString);
        this.query = this.filter();
    }
    filter() {
        const queryObj = (0, lodash_1.omit)(this.queryObject, ['page', 'sort', 'fields', 'limit']);
        let queryString = {};
        if (queryObj.color) {
            queryString = { colors: { $in: [queryObj.color] } };
        }
        if (queryObj.size) {
            queryString = Object.assign(Object.assign({}, queryString), { sizes: { $in: [queryObj.size] } });
        }
        return this.model.find(Object.assign(Object.assign({}, queryObj), queryString));
    }
    sort() {
        const sortBy = this.queryObject.sort.replace(/,/g, ' ');
        this.query = this.query.sort(sortBy);
        return this;
    }
    limit() {
        this.query = this.query.limit(Number(this.queryObject.limit));
        return this;
    }
    limitFields() {
        const fields = this.queryObject.fields.replace(/,/g, ' ');
        this.query = this.query.select(fields);
        return this;
    }
}
exports.default = ApiFeatures;
