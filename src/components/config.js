export default {
    config: {
        menuData: [{
                name: '用户管理',
                key: 'menu_1',
                icon: 'user',
                child: [{
                        subName: '用户信息',
                        key: "s_1",
                        url: '/user/message',
                        icon: 'book'
                    },
                    {
                        subName: '提现记录',
                        key: "s_2",
                        url: '/user/money',
                        icon: 'money-collect',

                    }
                ]
            },
            {
                name: '商品管理',
                icon: 'user',
                key: 'menu_2',
                icon: 'calculator',
                child: [{
                        subName: '所有商品',
                        key: "s_4",
                        url: '/product/all',
                        icon: 'container',

                    },
                    {
                        subName: '类目管理',
                        key: "s_5",
                        url: '/product/cat',
                        icon: 'setting',

                    },
                    {
                        subName: '品牌管理',
                        key: "s_6",
                        url: '/product/brand',
                        icon: 'shopping',

                    },
                    {
                        subName: '评论列表',
                        key: "s_6",
                        url: '/product/comments',
                        icon: 'message'

                    }
                ]
            },
            {
                name: '订单管理',
                key: 'menu_3',
                icon: 'security-scan',
                child: [{
                    subName: '全部订单',
                    key: "s_7",
                    icon: 'inbox',
                    url: '/order/manange'
                }]
            },
            {
                name: '活动管理',
                key: 'menu_4',
                icon: 'gift',
                child: [{
                        subName: '活动管理',
                        icon: 'like',
                        key: "s_8",
                        url: '/activity/Assemble'
                    },
                    {
                        subName: '试用报告',
                        icon: 'inbox',
                        key: "s_811111",
                        url: '/activity/trymessage'
                    },

                ]
            },
            {
                name: '优惠卷管理',
                key: 'menu_5',
                icon: 'pay-circle',
                child: [{
                    subName: '优惠卷',
                    key: "s_211",
                    icon: 'apartment',
                    icon: 'shop',
                    url: '/coupon/manage'
                }, ]
            },
            {
                name: '其他配置',
                key: 'menu_6',
                icon: 'notification',
                child: [{
                    subName: 'banner配置',
                    icon: 'apartment',
                    key: "s_21",
                    url: '/other/banner'
                }]
            },
            {
                name: '数据中心',
                key: 'menu_8',
                icon: 'dot-chart',
                child: [{
                    subName: '数据管理',
                    key: "s_21asda",
                    url: '/data/manage',
                    icon: 'fund',

                }]
            }
        ],
        imgIp: 'http://zxy.world:9998/wx/'
    }
}