/**
 * 将一个 JavaScript 对象转换为查询字符串形式
 * @param params 要转换的对象
 * @returns 转换后的查询字符串
 */
export function tansParams(params: Record<string, any>): string {
    let result = '';
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        const part = encodeURIComponent(propName) + '=';

        if (value !== null && value !== '' && typeof value !== 'undefined') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
                        const subPropName = `${propName}[${key}]`;
                        const subPart = encodeURIComponent(subPropName) + '=';
                        result += subPart + encodeURIComponent(value[key]) + '&';
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + '&';
            }
        }
    }

    // 移除末尾的 "&" 符号
    if (result.endsWith('&')) {
        result = result.slice(0, -1);
    }

    return result;
}

export const errorCode: { [key: string | number]: string } = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
};

// 验证是否为blob格式
export function blobValidate(data: any) {
    return data.type !== 'application/json'
}