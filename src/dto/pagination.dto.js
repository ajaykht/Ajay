class Pagination {
    constructor(page_no,total,pages,orderby,sorting_by_asc,page_size){
        this.page_no=page_no,
        this.total=total  ,
        this.pages=pages,
        this.orderby=orderby,
        this.sorting_by_asc=sorting_by_asc
        this.page_size=page_size
    }
}
module.exports = Pagination;
