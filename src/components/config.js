export default {
    config:{
        menuData: [{
            name: '用户管理',
            key: 'menu_1',
            child: [{
                    subName: '用户信息',
                    key: "s_1",
                    url: '/user/message'
                },
                {
                    subName: '提现记录',
                    key: "s_2",
                    url: '/user/money'
                }
            ]
        },
        {
            name: '商品管理',
            key: 'menu_2',
            child: [
                {
                    subName: '所有商品',
                    key: "s_4",
                    url: '/product/all'
                },
                {
                    subName: '类目管理',
                    key: "s_5",
                    url: '/product/cat'
                },
                {
                    subName: '品牌管理',
                    key: "s_6",
                    url: '/product/brand'
                }
            ]
        },
        {
            name: '订单管理',
            key: 'menu_3',
            child: [{
                subName: '全部订单',
                key: "s_7",
                url: '/order/manange'
            }
        ]
        },
        {
            name: '活动管理',
            key: 'menu_4',
            child: [{
                subName: '拼团活动',
                key: "s_8",
                url: '/activity/Assemble'
            },
            {
                subName: '限时特价',
                key: "s_9",
                url: '/activity/SpecialOffer'
            },
            {
                subName: '免费试用',
                key: "s_10",
                url: '/activity/tryFree'
            },
            
        ]
        },
        {
            name: '优惠卷管理',
            key: 'menu_5'
        },
        {
            name: '其他配置',
            key: 'menu_6',
            child: [{
                subName: 'banner配置',
                key: "s_21",
                url: '/other/banner'
            },
            {
                subName: '新人活动配置',
                key: "s_22",
                url: '/other/new'
            },
            {
                subName: '平台公告配置',
                key: "s_23",
                url: '/other/notice'
            }
        ]
        },
        {
            name: '供应链管理',
            key: 'menu_7'
        },
        {
            name: '数据中心',
            key: 'menu_8'
        }
    ],
    imgIp:'http://2hq8388555.goho.co/wx'
}
    }