<template>
  <div
    v-if="isPublishCoins"
    class="coins-publish"
  >
    <div class="line" />
    <div class="fl ac jsb coins-head">
      <div class="fl ac">
        <div class="fl ac">
          <avatar
            v-if="tokenCover"
            :src="tokenCover"
            size="30px"
            style="margin-right: 10px;"
          />
          <h1>
            {{ tokenDetailData.token.symbol }}
            ({{
              tokenDetailData.token.name
            }})
          </h1>
        </div>
        <!-- <el-tooltip effect="dark" content="如何管理你的Fan票?" placement="top-start">
          <svg-icon
            class="help-icon"
            icon-class="help"
          />
        </el-tooltip> -->
        <a
          class="help-link"
          target="_blank"
          href="https://www.matataki.cn/p/979"
        >如何管理你的Fan票?</a>
      </div>

      <div>
        <router-link :to="{name: 'token-id', params: { id: tokenDetailData.token.id || 0}}">
          <el-button size="small">
            详情
          </el-button>
        </router-link>
        <router-link :to="{name: 'editminetoken'}">
          <el-button size="small">
            编辑
          </el-button>
        </router-link>
        <el-button
          size="small"
          @click="addCoins"
        >
          增发
        </el-button>
        <router-link :to="{name: 'exchange', hash: '#swap', query: { output: tokenDetailData.token.symbol }}">
          <el-button
            size="small"
            type="primary"
          >
            交易
          </el-button>
        </router-link>
      </div>
    </div>

    <p
      v-if="!tokenDetailData.token.contract_address"
      class="warning"
    >
      Fan票正在部署中，请耐心等候。
    </p>
    <!-- <div class="line" /> -->

    <h2 class="token-title">
      简介
    </h2>
    <p class="token-sub">
      {{ tokenDetailData.token.brief || $t('not') }}
    </p>

    <h2 class="token-title">
      介绍
    </h2>
    <p class="token-sub">
      <!-- 开了wrap 这个span不能换行！ -->
      <span class="wrap-open">{{ tokenDetailData.token.introduction || $t('not') }}</span>
    </p>

    <h2 class="token-title">
      {{ $t('social.relatedWebsites') }}
    </h2>
    <ul
      v-if="resourcesWebsites.length !== 0"
      class="about-nav"
    >
      <li
        v-for="(item, index) in resourcesWebsites"
        :key="index"
      >
        <a
          :href="item"
          target="_blank"
        >{{ item }}</a>
      </li>
    </ul>
    <span
      v-else
      class="not"
    >{{ $t('not') }}</span>

    <h2 class="token-title">
      {{ $t('social.socialAccount') }}
    </h2>

    <div
      v-if="resourcesSocialss.length !== 0"
      class="fl social"
    >
      <div class="social-btn">
        <socialIcon
          v-for="(item, index) in resourcesSocialss"
          :key="index"
          :show-tooltip="true"
          :icon="item.type"
          :content="item.content"
        />
      </div>
    </div>
    <span
      v-else
      class="not"
    >{{ $t('not') }}</span>

    <h2 class="token-title">
      分享挂件
    </h2>

    <el-input
      v-model="tokenWidget"
      :rows="4"
      class="token-widget"
      type="textarea"
      placeholder="请输入内容"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '@/components/avatar/index.vue'
import { precision, toPrecision } from '@/utils/precisionConversion'
import socialTypes from '@/config/social_types.js'
import socialIcon from '@/components/social_icon/index.vue'

export default {
  components: {
    avatar,
    socialIcon
  },
  data() {
    return {
      tokenId: null,
      isPublishCoins: false,
      tokenDetailData: {
        token: {
          contract_address: true // // v-fi 会取反
        }
      },
      pointLog: {
        params: {
          pagesize: 10
        },
        apiUrl: 'tokenUserList',
        list: []
      },
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      total: 0,
      assets: {
      },
      viewStatus: 0, // 0 1
      amount: 0,
      resourcesSocialss: [],
      resourcesWebsites: []
    }
  },
  computed: {
    ...mapGetters(['isLogined']),
    totalAmount() {
      if (this.tokenDetailData.token) {
        const tokenamount = precision(this.tokenDetailData.token.total_supply, 'CNY', this.tokenDetailData.token.decimals)
        return this.$publishMethods.formatDecimal(tokenamount, 4)
      } else return 0
    },
    tokenReserve() {
      if (this.tokenDetailData.exchange) {
        const tokenamount = precision(this.tokenDetailData.exchange.token_reserve, 'CNY', this.tokenDetailData.token.decimals)
        return this.$publishMethods.formatDecimal(tokenamount, 4)
      } else return 0
    },
    cnyReserve() {
      if (this.tokenDetailData.exchange) {
        const tokenamount = precision(this.tokenDetailData.exchange.cny_reserve, 'CNY', this.tokenDetailData.token.decimals)
        return this.$publishMethods.formatDecimal(tokenamount, 4)
      } else return 0
    },
    balance() {
      if (this.tokenDetailData.token) {
        const tokenamount = precision(this.tokenDetailData.token.balance, 'CNY', this.tokenDetailData.token.decimals)
        return this.$publishMethods.formatDecimal(tokenamount, 4)
      } else return 0
    },
    nowPrice() {
      if (this.tokenDetailData.exchange) {
        const price = this.tokenDetailData.exchange.cny_reserve / this.tokenDetailData.exchange.token_reserve
        const formatDecimal = this.$publishMethods.formatDecimal(price, 2)
        return isNaN(formatDecimal) ? 0 : Number(formatDecimal) < 0.01 ? '<0.01' : formatDecimal
      } else return 0
    },
    tokenCover() {
      if (this.tokenDetailData.token) {
        const logo = this.tokenDetailData.token.logo
        return logo ? this.$ossProcess(logo) : ''
      } else return ''
    },
    tokenWidget() {
      return `<iframe width="100%" height="200px" src='${process.env.VUE_APP_URL}/widget/token/?id=${this.tokenId || 0}' frameborder=0></iframe>`
    }
  },
  created() {
    this.tokenDetail()
  },
  mounted() {},
  methods: {
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          if (res.data.token) {
            this.isPublishCoins = true
            this.tokenDetailData = res.data
            this.tokenId = res.data.token.id
            this.minetokenGetResources(res.data.token.id)
          } else {
            this.$router.push({
              name: 'postminetoken'
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async minetokenGetResources(id) {
      await this.$API.minetokenGetResources(id).then(res => {
        if (res.code === 0) {
          const socialFilter = res.data.socials.filter(i => socialTypes.includes(i.type)) // 过滤
          const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
          this.resourcesSocialss = socialFilterEmpty
          this.resourcesWebsites = res.data.websites
        } else {
          this.$message.warning(res.message)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    async minetokenMint(amount) {
      const data = {
        amount: toPrecision(amount, 'CNY', this.tokenDetailData.token.decimals)
      }
      await this.$API.minetokenMint(data)
        .then(res => {
          if (res.code === 0) {
            this.tokenDetail()
            this.$message.success(res.message)
          } else {
            this.$message.error(res.message)
          }
        })
    },
    addCoins() {
      if (!this.isLogined) return this.$store.commit('setLoginModal', true)
      this.$prompt('增发数量(总量最多发行一亿)', '提示', {
        inputPattern: /^\d{0,9}$/,
        inputErrorMessage: '请输入数字(总量最多发行一亿)',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if ((Number(value) + Number(this.totalAmount)) > 100000000) return this.$message.warning('发行总量不能超过一亿')
        if (Number(value) > 0) this.minetokenMint(Number(value))
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coins-publish {
  padding: 10px;
}
.coins-head {
  margin: 20px 0 20px;
  h1 {
    font-size:24px;
    font-weight:bold;
    color:rgba(0,0,0,1);
    line-height:33px;
    padding: 0;
    margin: 0;
  }
  .help-icon {
    color:rgba(219,219,219,1);
    margin-left: 10px;
    margin-right: 10px;
  }
  .help-link {
    font-size:14px;
    color: #868686;
    line-height:20px;
    text-decoration: underline;
    margin-left: 10px;
  }
}

.token-title {
  font-size:24px;
  font-weight:bold;
  color:rgba(0,0,0,1);
  line-height:33px;
  padding: 0;
  margin: 40px 0 0;
}
.token-sub {
  font-size:16px;
  font-weight:400;
  color:rgba(0,0,0,1);
  line-height:22px;
  padding: 0;
  margin: 12px 0 0;
}

.coins-info {
  border-bottom: 1px solid #ececec;
  padding: 0 0 20px;
}
.info-line {
  width:1px;
  height:40px;
  background: #dbdbdb;
  margin: 0 40px;
}
.info-block {
  flex: 1;
  .info-data {
    text-align: center;
    &-number {
      font-size:24px;
      font-weight:bold;
      color:rgba(84,45,224,1);
      line-height:28px;
      padding: 0;
      margin: 0;
      sub {
        bottom: 0;
        font-size: 70%;
      }
    }
    &-title {
      font-size:14px;
      color:rgba(0,0,0,1);
      line-height:20px;
      padding: 0;
      margin: 0;
    }
  }
}
.info-btn {
  margin-left: 40px;
  .info-button {
    margin: 4px 0;
  }
}

.pagination {
  margin-top: 40px;
}

.tokens-tab {
  padding: 20px 0;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.line {
  height: 1px;
  background: #ececec;
}

.about-nav {
  padding: 0;
  margin: 10px 0 0;
  overflow: hidden;
  li {
    list-style: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px 0;
    a {
      font-size:16px;
      color:@black;
      line-height:22px;
      text-decoration: underline;
    }
  }
}
.social {
  margin-top: 20px;
}
.social-btn {
  display: flex;
  & > div {
    margin-right: 8px;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
.token-widget {
  width: 400px;
  margin-top: 20px;
}

.not {
  color: #333;
  font-style: 14px;
  padding-top: 20px;
  display: inline-block;
}
.wrap-open {
  white-space: pre-wrap;
}

.warning {
  padding: 0;
  margin: 20px 0 0;
  font-size: 16px;
  color: red;
}
</style>
