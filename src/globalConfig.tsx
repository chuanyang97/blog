export const indexConfig = {
    defaultTitle: 'chuanyang_的个人博客',
}

export const headerConfig = {
    menu: [
        {
          key: "home",
          description: "首页",
          label: "首页",
          path: '/',
          icon: (
            <i className="icon icon-home"></i>
          ),
        },
        {
          key: "article",
          label: "文章",
          icon: (
            <i className="icon icon-calendar"></i>
          ),
          children: [
            {
              key: "category",
              label: "分类",
              description: "文章分类, 用于文章分类展示，方便查找文章",
              path: '/article/category',
              icon:(
                <i className="icon icon-form"></i>
              )
            },
            {
              key: "tags",
              label: "标签",
              description: "文章标签， 用于文章标签展示，方便查找文章",
              path: '/article/tags',
              icon:(
                <i className="icon icon-news_hot_light" />
              )
            },
            {
              key: "archives",
              label: "归档",
              description: "文章归档， 用于文章归档展示，方便查找文章",
              path: '/article/archives',
              icon:(
                <i className="icon icon-baby" />
              )
            },
          ]
        },
        {
          key: "site",
          label: "站点",
          icon: (
            <i className="icon icon-apps"></i>
          ),
          children: [
            {
              key: "speaks",
              label: "说说",
              description: "站点说说， 用于站点说说展示，方便查找说说",
              path: '/chuanyang/speaks',
              icon:(
                <i className="icon icon-message"></i>
              )
            },
            {
              key: "messageboard",
              label: "留言板",
              description: "站点留言板， 用于站点留言板展示，方便查找留言",
              path: '/chuanyang/messageboard',
              icon:(
                <i className="icon icon-form_light"></i>
              )
            },
            {
              key: "friends",
              label: "友链",
              description: "站点友链， 用于站点友链展示，方便查找友链",
              ptah: '/chuanyang/friends',
              icon:(
                <i className="icon icon-friend"></i>
              )
            },
          ]
        },
        {
          key: "about",
          label: "关于",
          path: '/about',
          icon:(
            <i className="icon icon-people" />
          )
    
        },
      ]
}