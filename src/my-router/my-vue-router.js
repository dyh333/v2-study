let Vue;

class MyVueRouter {
  constructor(options) {
    this.$options = options;

    // 监控hash变化
    // 利用defineReactive把current变成“响应式”的变量
    const initial = window.location.hash.slice(1) || '/';
    Vue.util.defineReactive(this, 'current', initial);

    window.addEventListener('hashchange', () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

// 实现静态方法install
// 把Vue作为参数传入，这样打包的库不需要把vue打进去就可以使用Vue的实例
MyVueRouter.install = function (_Vue) {
  Vue = _Vue;

  // 全局混入目的：延迟下面逻辑到router创建完毕并且附加到选项上时才执行
  Vue.mixin({
    beforeCreate() {
      // 次钩子在每个组件创建实例时都会调用
      // Vue根实例必有该选项
      if (this.$options.router) {
        // 挂载到Vue上，全局都可以使用this.$router
        // this.$options.router其实就是上面那个MyVueRouter的实例
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  // 注册实现两个组件router-view,router-link
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // <a href="to">xxx</a>
      return h(
        'a',
        {
          attrs: {
            href: '#' + this.to
          }
        },
        // ???
        this.$slots.default
      );
    }
  });
  Vue.component('router-view', {
    // 响应式数据发生变化，依赖的组件会自动render
    render(h) {
      let component = null;

      const route = this.$router.$options.routes.find((route) => {
        return route.path === this.$router.current;
      });

      if (route) {
        component = route.component;
      }

      return h(component);
    }
  });
};

export default MyVueRouter;
