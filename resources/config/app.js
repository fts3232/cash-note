const categoryMap = {
    'c-1-1': '生活必要花费-交通',
    'c-1-2': '生活必要花费-餐饮',
    'c-1-3': '生活必要花费-住宿',
    'c-1-4': '生活必要花费-话费',
    'c-1-5': '生活必要花费-剪发',
    'c-2-1': '交通',
    'c-2-2': '餐饮',
    'c-2-3': '住宿',
    'c-2-4': '网吧',
    'c-2-5': '游戏',
    'c-2-6': '购物',
    'c-2-7': '大保健',
    'c-2-8': 'vpn',
    'i-1-1': '工资',
    'i-1-2': '其他'
};

const selectCategoryMap = {
    'cost': [
        {
            'label': '生活必要花费',
            'items': [
                {
                    label: '交通', value: 'c-1-1'
                },
                {
                    label: '餐饮', value: 'c-1-2'
                },
                {
                    label: '住宿', value: 'c-1-3'
                },
                {
                    label: '话费', value: 'c-1-4'
                },
                {
                    label: '剪发', value: 'c-1-5'
                }
            ]
        },
        {
            'label': '其他',
            'items': [
                {
                    label: '交通', value: 'c-2-1'
                },
                {
                    label: '餐饮', value: 'c-2-2'
                },
                {
                    label: '住宿', value: 'c-2-3'
                },
                {
                    label: '网吧', value: 'c-2-4'
                }
                ,
                {
                    label: '游戏', value: 'c-2-5'
                }
                ,
                {
                    label: '购物', value: 'c-2-6'
                }
                ,
                {
                    label: '大保健', value: 'c-2-7'
                },
                {
                    label: 'vpn', value: 'c-2-8'
                }
            ]
        }
    ],
    'income': [
        {
            label: '工资', value: 'i-1-1'
        },
        {
            label: '其他', value: 'i-1-2'
        }
    ]
};
export { categoryMap, selectCategoryMap };