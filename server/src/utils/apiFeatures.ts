import { Document, Model, Query, HydratedDocument } from 'mongoose';
import { omit } from 'lodash';

type MongooseQuery<T extends Document> = Query<HydratedDocument<T, {}, {}>[], HydratedDocument<T, {}, {}>, {}, T>

type QueryObject = { 
    page: number;
    limit: number;
    fields: string;
    sort: string;
    color?: string[];
    size?: string[]; 
}

type QueryString = {
    page?: number;
    limit?: number;
    fields?: string;
    sort?: string;
}

class ApiFeatures<T extends Document> {
    query: MongooseQuery<T>;
    queryObject: QueryObject;
    defaultQueryObject = {
        page: 0,
        limit: 48,
        fields: '-__v,-updatedAt',
        sort: '-createdAt'
    }

    constructor(public model: Model<T>, queryString: QueryString) {
        this.queryObject = { ...this.defaultQueryObject, ...queryString }
        this.query = this.filter()
    }

    filter(): MongooseQuery<T> {
        const queryObj = omit(this.queryObject, ['page', 'sort', 'fields', 'limit']);

        let queryString = {}

        if (queryObj.color) {
            queryString = { colors: { $in: [queryObj.color] }  }
        }

        if (queryObj.size) {
            queryString = { ...queryString, sizes: { $in: [queryObj.size] }  }
        }

        return this.model.find({ ...queryObj, ...queryString } as any);
    }

    sort(): this {
        const sortBy = this.queryObject.sort.replace(/,/g, ' ');
        this.query = this.query.sort(sortBy);
        return this
    }

    limit(): this {
        this.query = this.query.limit(Number(this.queryObject.limit));
        return this
    }

    limitFields(): this {
        const fields = this.queryObject.fields.replace(/,/g, ' ')
        this.query = this.query.select(fields)
        return this;
    }
}

export default ApiFeatures;