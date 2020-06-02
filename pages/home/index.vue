<template>
  <div class="home">
    <!-- screen1 -->
    <section class="screen1">
      <section class="screen1-main">
        <header>
          <img src="@/assets/img/home/logo.png" alt="logo" class="logo">
          <div>
            <el-dropdown
              v-if="isLogined"
              class="user-menu"
            >
              <div class="user-avatar">
                <img
                  v-if="avatar"
                  :src="avatar"
                  alt="user avatar"
                >
              </div>
              <el-dropdown-menu
                slot="dropdown"
                class="user-dorpdown"
              >
                <n-link
                  :to="{name: 'user-id', params:{id: currentUserInfo.id}}"
                  class="link"
                >
                  <el-dropdown-item>
                    {{ currentUserInfo.nickname || currentUserInfo.name }}
                  </el-dropdown-item>
                </n-link>
                <n-link
                  :to="{name: 'setting', params:{id: currentUserInfo.id}}"
                  class="link"
                >
                  <el-dropdown-item>
                    {{ $t('home.account') }}
                  </el-dropdown-item>
                </n-link>
      
                <div
                  class="link"
                  @click="btnsignOut"
                >
                  <el-dropdown-item>
                    {{ $t('home.signOut') }}
                  </el-dropdown-item>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <a
              v-else
              href="javascript:;"
              class="login-btn"
              @click="login"
            >注册/登录</a>
          </div>
        </header>
        <section class="screen1-block__text">
          <div class="screen1-block__text__content">
            <h1>我们帮助 <span>自由</span> 的创作者<br>获得更多收入<br>& 建立 <span>公开 永存</span> 的数字作品库</h1>
            <p>
              所有在 瞬Matataki 上的内容创作，都会上传到 IPFS（星际文件系统）的多个节点上，实现作品的分布式存储，无需担心被和谐删档，你的数据只属于你自己。
              <br>
              Matataki希望围绕 有趣的话题、深度思考，吸引有独立精神的创作者，构建独特的内容价值网络，依托于区块链技术搭建稳固优质社群平台，保护创作内容版权；配合独特算法让优质内容浮现，以数字货币和粉丝通证让创作者、参与者获得持续回报。
            </p>
          </div>

          <section class="screen1-block__btn">
            <a href="javascript:;" class="screen1-btn create" @click="writeP">立即创作</a>
            <router-link :to="{name: 'article'}" class="screen1-btn subscribe">
              探索作品
            </router-link>
            <!-- <a href="javascript:;" class="screen1-more">订阅我们</a> -->
          </section>
          <section class="qq-notice">
            <p>请加入我们的官QQ群：<a href="https://jq.qq.com/?_wv=1027&k=gY0RKj2t" rel="noopener noreferrer" target="_blank">766605671</a></p>
          </section>
        </section>
        <section class="screen1-block__img">
          <img src="@/assets/img/home/home_screen1_img.png" alt="img">
        </section>
      </section>

      <div class="screen1-bc">
        <img src="@/assets/img/home/home_screen1_icon1.png" alt="icon">
        <img src="@/assets/img/home/home_screen1_icon2.png" alt="icon">
        <img src="@/assets/img/home/home_screen1_icon3.png" alt="icon">
        <img src="@/assets/img/home/home_screen1_icon4.png" alt="icon">
        <img src="@/assets/img/home/home_screen1_icon5.png" alt="icon">
        <img src="@/assets/img/home/home_screen1_icon6.png" alt="icon">
      </div>
    </section>

    <!-- screen2 -->
    <section class="screen2">
      <h3 class="screen-title">
        TA们也在使用Matataki
      </h3>
      <section class="screen2-content">
        <el-carousel
          v-if="swipeMode === 'double'"
          class="swipe-carousel"
          :height="swipeHeight"
          indicator-position="outside"
          trigger="click"
          :interval="5000"
        >
          <el-carousel-item v-for="item in Math.ceil(supporters.length / 2)" :key="item">
            <div class="swipe">
              <template>
                <div v-for="(supporter, index) in supportersX2(item)" :key="index" class="swipe-block">
                  <!-- <div class="swipe-tag">
                    已入驻365天
                  </div> -->

                  <router-link :to="{name: 'user-id', params: { id: supporter.id } }" target="_blank">
                    <section class="swipe-head">
                      <c-avatar :src="imgUrl(supporter.avatar)" />
                      <section class="swipe-head-info">
                        <p class="swipe-info-title">{{ supporter.nickname }}</p>
                        <p class="swipe-info-sub">{{ supporter.signature }}</p>
                      </section>
                    </section>
                  </router-link>
                  <p class="swipe-text">
                    {{ supporter.slogan }}
                  </p>
                  <div class="swipe-line" />
                  <p class="swipe-publish">
                    <span>{{ supporter.numPosts }}</span>篇文章已发表
                  </p>
                  <router-link :to="{name: 'p-id', params: { id: supporter.post.id } }" target="_blank">
                    <div class="swipe-article">
                      <div class="swipe-article-full" />
                      <img :src="imgUrl(supporter.post.cover)" alt="cover">
                      <p class="swipe-article-text">{{ supporter.post.title }}</p>
                    </div>
                  </router-link>
                </div>
              </template>
            </div>
          </el-carousel-item>
        </el-carousel>
        <el-carousel
          v-if="swipeMode === 'single'"
          class="swipe-carousel"
          :height="swipeHeight"
          indicator-position="outside"
          trigger="click"
          :interval="5000"
        >
          <el-carousel-item v-for="(supporter, index) in supporters" :key="index">
            <div class="swipe">
              <template>
                <div class="swipe-block single">
                  <!-- <div class="swipe-tag">
                    已入驻340天
                  </div> -->

                  <router-link :to="{name: 'user-id', params: { id: supporter.id } }" target="_blank">
                    <section class="swipe-head">
                      <c-avatar :src="imgUrl(supporter.avatar)" />
                      <section class="swipe-head-info">
                        <p class="swipe-info-title">{{ supporter.nickname }}</p>
                        <p class="swipe-info-sub">{{ supporter.signature }}</p>
                      </section>
                    </section>
                  </router-link>
                  <p class="swipe-text">
                    {{ supporter.slogan }}
                  </p>
                  <div class="swipe-line" />
                  <p class="swipe-publish">
                    <span>{{ supporter.numPosts }}</span>篇文章已发表
                  </p>
                  <router-link :to="{name: 'p-id', params: { id: supporter.post.id } }" target="_blank">
                    <div class="swipe-article">
                      <div class="swipe-article-full" />
                      <img :src="imgUrl(supporter.post.cover)" alt="cover">
                      <p class="swipe-article-text">{{ supporter.post.title }}</p>
                    </div>
                  </router-link>
                </div>
              </template>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>
    </section>

    <!-- screen3 -->
    <section class="screen3">
      <div class="screen3-bc">
        <img src="@/assets/img/home/home_screen3_icon1.png" alt="icon">
      </div>
      <h3 class="screen-title">
        为什么要在Matataki上创作？
      </h3>
      <section class="screen3-content">
        <section class="screen3-block">
          <img src="@/assets/img/home/home_screen3_1.png" alt="icon">
          <h4>永久保存<br>只管放心发表</h4>
          <p>无需担心被和谐，你创造的内容被永久存储在IPFS分布式网络上，且无法被任何人进行再次修改，方便在其他平台日后维权。</p>
        </section>
        <section class="screen3-block">
          <img src="@/assets/img/home/home_screen3_2.png" alt="icon">
          <h4>自由创作<br>尺度收放自如</h4>
          <p>功能强大的内容编辑器，没有人可以影响您的创作自由，一切尽在自己掌控之中。您也可以允许自己的真粉们向自己提出建议的特权。</p>
        </section>
        <section class="screen3-block">
          <img src="@/assets/img/home/home_screen3_3.png" alt="icon">
          <h4>个人通证<br>数字社交货币</h4>
          <p>让粉丝们使用你发行的个人通证来解锁文章！你的个人通证的价值将不断增加！粉丝通证不仅仅是你的专属货币，也是粉丝们作为同行者的印记。</p>
        </section>
        <section class="screen3-block">
          <img src="@/assets/img/home/home_screen3_4.png" alt="icon">
          <h4>潜在收入<br>内容付费和打赏</h4>
          <p>你的任何文章都可设置付费解锁，不要低估粉丝对您作品的喜爱，只要是优质作品，即使需要付费，他们也会常有付费动力！甚至用个人通证打赏。</p>
        </section>
      </section>
    </section>


    <!-- screen4 -->
    <section class="screen4">
      <h3 class="screen-title">
        三步 使用 MATATAKI
      </h3>
      <section class="screen4-content">
        <section class="screen4-block">
          <h4>1.创建内容</h4>
          <p>无需担心被和谐，你创造的内容被永久存储在IPFS分布式网络上，且无法被任何人进行再次修改，方便在其他平台日后维权。</p>
          <img src="@/assets/img/home/home_screen4_1.png" alt="icon">
        </section>
        <img src="@/assets/img/home/home_screen4_arrow.png" alt="screen" class="screen4-arrow">
        <section class="screen4-block">
          <h4>2.分享链接</h4>
          <p>将你的作品连接分享到你的粉丝大本营，如微博、公众号、微信群等。</p>
          <img src="@/assets/img/home/home_screen4_2.png" alt="icon">
        </section>
        <img src="@/assets/img/home/home_screen4_arrow.png" alt="screen" class="screen4-arrow">
        <section class="screen4-block">
          <h4>3.获得收益</h4>
          <p>当你设置付费可见的内容被查看了，当即获得收益。优秀的作品甚至可以收到额外打赏。</p>
          <img src="@/assets/img/home/home_screen4_3.png" alt="icon">
        </section>
      </section>

      <p class="screen4-title">每一篇自由的创作都应该被永远记录 <span>—— 瞬Matataki</span></p>
      <p class="screen4-btn">
        <router-link :to="{name: 'article'}" class="screen4-btn">探索更多</router-link>
      </p>
    </section>

    <!-- screen5 -->
    <!-- <section class="screen5">
      <h3 class="screen-title">
        订阅 瞬Matataki 资讯
      </h3>
      <section class="screen5-content">
        <input type="text" placeholder="请输入您的邮箱">
        <a href="javascript:;">订阅我们</a>
      </section>
    </section> -->

    <!-- screen6 -->
    <section class="screen6">
      <h3>Q & A</h3>
      <section class="screen6-content">
        <section class="screen6-block">
          <h4>1 个人通证 与 瞬Matataki 的关系？</h4>
          <p>个人通证是一种由个人发行的数字货币，在 瞬Matataki 上也被叫做Fan票，主要被用于支付解锁与你相关的个人创作内容。同时还可以被用作为“粉丝令牌”，只要持有一定数量也可以解锁一些你的创作内容。瞬Matataki 是首个引用了 个人通证 作为支付手段和核心验证手段的 内容创作平台。未来 瞬Matataki 也会开发出更多基于个人通证的有趣使用场景。更多说明可以查看<a href="https://www.matataki.cn/p/977?invite=9" target="_blank">这篇</a></p>
        </section>

        <section class="screen6-block">
          <h4>2 使用Matataki的优势在哪？</h4>
          <p>瞬Matataki 对于创作者来说是个绝佳 且 安全的内容创作平台：我们没有签约和入驻，对于内容和发布的频次我们也没有任何限制。内置了强大的Markdown编辑器，并且支持直接导入您在其他多个内容平台上的作品。利用 去中心化存储技术强力保障您的作品安全，免受和谐之苦！您只管 自由 创作！</p>
        </section>

        <section class="screen6-block">
          <h4>3 瞬Matataki 是否收费？</h4>
          <p>瞬Matataki 对于所有用户都是完全免费使用的。涉及到链上交易部分将会通过钱包扣除必要的交易手续费。</p>
        </section>

        <section class="screen6-block">
          <h4>4 我的作品如果被侵权了怎么办？</h4>
          <p>在Matataki的所有文章都使用区块链技术盖上了时间戳，并且无法被篡改。这将可以作为有力证据在维权的时候使用。我们正在逐步推出社区治理系统，加强对于侵权内容的管控。</p>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { removeCookie } from '@/utils/cookie'
import store from '@/utils/store.js'
import throttle from 'lodash/throttle'

export default {
  data() {
    return {
      resizeEvent: null,
      swipeMode: '', // single double
      swipeHeight: '720px', // 高度
      avatar: '',
      supporters: [
        {
          id: 82,
          nickname: 'Ponge',
          avatar: '/avatar/2019/09/06/b4b75ec1f3ab19c74aab668579535848.jpeg',
          signature: '金融从业，专注投资',
          slogan: 'Matataki是我遇到对markdown支持最好的内容写作平台，让作者能够安心于内容创作，把排版美化的工作放心地交给它（手机端和网页端呈现都很好）。平台虽然不大，但能看出开发者的良苦用心，widget的设计、引用的嵌入、Fan票的设立……一步步走来，能够看到开发者对于创作者的尊重，也能看到开发者的认真与执着。既希望网站能够在有朝一日被更多的创作者发现并喜爱，又有点私心地希望这个宝藏网站不为人所知。哈哈，说了这么多，你不来试试吗？',
          numPosts: 28,
          post: {
            id: 3459,
            title: '《随机漫步的傻瓜》读书笔记',
            cover: '/image/2020/04/19/e06e9d228e70c153d03179412fad42b5.jpg'
          }
        },
        {
          id: 1187,
          nickname: '赛博佛客',
          avatar: '/avatar/2019/12/08/63ffa3218e0671194d7cc3b25f4259eb.jpg',
          signature: '机械先驱，人类叛徒，世界属于AI，区块链幻想家',
          slogan: 'Matataki，是我使用过最为方便的上链应用。不再需要我手动进行16进制转换，添加交易数据还要设置各种各样的gas。同时也是个人代币发行展示运作的开拓者。',
          numPosts: 3,
          post: {
            id: 2231,
            title: '全民记者时代——【新闻链&真相链】经济模型设计讨论',
            cover: '/image/2020/02/05/c739f378900a108236fac587498e53d7.png'
          }
        },
        {
          id: 967,
          nickname: '加菲众',
          avatar: '/avatar/2019/11/15/ceac57a33b012302d637f8d9f2927d3d.jpeg',
          signature: '著名音乐电台DJ、科技活动主持人、动静科技创始人',
          slogan: '迄今为止，Matataki是内容价值领域最易用直观的产品。小岛和他的团队已经寻得了内容通证化的最优路径。',
          numPosts: 15,
          post: {
            id: 3376,
            title: '鲍勃·迪伦全新单曲《最邪恶的谋杀》——中文翻译及图文注释',
            cover: '/image/2020/04/10/568089e6058733234ea746309a224f74.jpeg'
          }
        },
        {
          id: 989,
          nickname: 'UDSPJ',
          avatar: '/avatar/2019/11/17/d1c06bec2210f293fa1a8a0576a54efd.jpg',
          signature: '一个废宅',
          slogan: '最近需要合适的内容付费平台来更新文章或漫画，Matataki可以选择对单篇进行一次性支付或者对持有一定量Fan票的用户开放部分帖子阅读权限，对读者而言持有Fan票后可以永久阅读一部分内容。',
          numPosts: 38,
          post: {
            id: 1263,
            title: '漫画小教程：摇曳露营×Dijkstra最短路径',
            cover: '/image/2019/11/26/266b169068088e42e73e0fb86e89bc4b.jpg'
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined']),
  },
  watch: {
    isLogined(newState) {
      if (newState) this.refreshUser()
    },
  },
  created() {
    this.init()
    if (process.browser) {
      this.$nextTick(() => {
        this.initSwipe()
        this.resizeEvent = throttle(this.initSwipe, 300)
        window.addEventListener('resize', this.resizeEvent)
      })
    }
    if (this.isLogined) this.refreshUser()
    this.getAllNumArticles()
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeEvent)
  },
  methods: {
    ...mapActions(['getCurrentUser', 'signOut', 'resetAllStore']),
    ...mapActions('notification', ['getNotificationCounters']),
    async init() {
    },
    async refreshUser() {
      const { avatar } = await this.getCurrentUser()
      if (avatar) this.avatar = this.$ossProcess(avatar, { h: 60 })
      await this.getNotificationCounters()
    },
    // 初始化轮播图 
    initSwipe() {
      try {
        const clientWidth = document.body.clientWidth || document.documentElement.clientWidth
        // console.log('clientWidth', clientWidth)
        if (clientWidth < 800) {
          this.swipeMode = 'single'
        } else {
          this.swipeMode = 'double'
        }

        if (clientWidth < 540) {
          this.swipeHeight = '480px'
        } else {
          this.swipeHeight = '720px'
        }
      } catch(e) {
        console.log(e)
      }
    },
    supportersX2(index) {
      const indexX2 = (index - 1) * 2
      let list = []
      for (let i = indexX2; i < indexX2 + 2; i++) {
        if(this.supporters[i]) list.push(this.supporters[i])
      }
      return list
    },
    imgUrl(src) {
      return src ? this.$ossProcess(src) : ''
    },
    login() {
      this.$store.commit('setLoginModal', true)
      this.$emit('login')
    },
    btnsignOut() {
      if (confirm(this.$t('warning.confirmLogout'))) {

        // 出错后弹出框提示
        const alertDialog = () => {
          this.$alert('很抱歉，退出登录失败，点击确定刷新', '温馨提示', {
            showClose: false,
            type: 'success',
            callback: () => {
              window.location.reload()
            }
          })
        }

        // 重置all store
        this.resetAllStore()
          .then(() => {
            removeCookie('ACCESS_TOKEN')
            removeCookie('idProvider')
            removeCookie('referral')
            store.clear()
            sessionStorage.clear()

            this.$router.go(0)
            // 通知刷新其他页面
            setTimeout(() => {
              this.$userMsgChannel.postMessage('logout')
            }, 2000)

          }).catch(err => {
            console.log(err)
            alertDialog()
          })
      }
    },
    writeP() {
      if (this.isLogined) this.$router.push({ name: 'publish-type-id', params: { type: 'draft', id: 'create' } })
      else this.login()
    },
    async getNumArticles(id) {
      const res = await this.$API.getNumArticles(id)
      let count = 0
      if(res.code === 0) count = res.data.count
      return count
    },
    async getAllNumArticles() {
      for(let i = 0; i < this.supporters.length; i++) {
        const numPosts = await this.getNumArticles(this.supporters[i].id)
        if(numPosts) this.supporters[i].numPosts = numPosts
      }
    }
  }
}
</script>

<style lang="less" scoped src="./index.less"></style>