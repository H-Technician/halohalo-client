import Http from '@/composables/useRequest'
import type { Category } from '@/types/category'
// 获取分区列表接口
export async function getAategoryApi() {
    return await Http.get<Category[]>('/Category/getCategoryList');
}