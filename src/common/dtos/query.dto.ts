import { PartialType } from "@nestjs/mapped-types"

export class QueryOptions {
    limit?: number
    skip? : number
    order? : string
    select ?:  string 
}

export class PartialQueryOptions extends PartialType(QueryOptions) {}