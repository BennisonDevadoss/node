import { DevicePaginator, DeivceRowsAndCounts } from '../types'

type PaginatorType = DevicePaginator
type PaginateType = DeivceRowsAndCounts

function paginatorResult(paginator: PaginatorType, type: string) {

    console.log('paginator is', paginator)
    const totalPages = paginator.last_page;
    const currentPage = paginator.current_page;
    const perPage = paginator.per_page;
    const total = paginator.total
    const startAt = (currentPage - 1) * perPage + 1;

    const end = currentPage * perPage;
    const endAt = total < end ? total : end
    console.log('Paginator.Data is', paginator.data);
    const result = {
        [type]: paginator.data,
        pagination: {
            current_page: currentPage,
            per_page: perPage,
            total_pages: totalPages,
            start_at: startAt,
            end_at: endAt,
            total_count: total,
            next_page: currentPage >= totalPages ? null : currentPage,
            prev_page: currentPage === 1 ? null : currentPage - 1,
            is_first_page: currentPage === 1,
            is_last_page: currentPage >= totalPages
        }
    };
    console.log('result is', result)
    return result;
}

function paginate(data: PaginateType, perPage: number, page: number) {
    console.log('Data is', data)
    const limit = perPage;
    const total = data.count;
    const result = {
        total,
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(total / perPage),
        data: data.rows
    }
    // console.log('Last page is', result.last_page)

    console.log('result is', result)
    return result;
}

export {
    paginate,
    paginatorResult
}