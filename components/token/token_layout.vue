<template>
  <div class="token">
    <g-header />

    <div class="container-padding">
      <div class="token-detail">
        <div class="fl">
          <avatar
            :src="logo"
            size="120px"
          />
          <div class="token-detail-info">
            <div class="fl info-line">
              <div class="token-info-title bold">
                {{ minetokenToken.symbol }}
              </div>
              <div>
                <p class="token-info-sub">
                  {{ minetokenToken.name }}
                </p>
              </div>
              <div>
                <a
                  class="help-link"
                  href="https://www.matataki.cn/p/977"
                  target="_blank"
                >{{ $t('token.whatIsAFanTicket') }}</a>
              </div>
            </div>
            <div class="fl info-line">
              <div class="token-info-title">
                {{ $t('token.founder') }}：
              </div>
              <div>
                <p class="token-info-sub">
                  <router-link
                    :to="{name: 'user-id', params: {id: minetokenToken.uid}}"
                  >
                    {{ minetokenUser.nickname || minetokenUser.username }}
                  </router-link>
                </p>
              </div>
            </div>
            <div class="fl info-line">
              <div class="token-info-title">
                {{ $t('token.releaseTime') }}：
              </div>
              <div>
                <p class="token-info-sub">
                  {{ friendlyDate }}
                </p>
              </div>
            </div>
            <div class="fl info-line">
              <div
                class="token-info-title"
                v-html="$t('token.summary')"
              />
              <div>
                <p class="token-info-sub">
                  {{ minetokenToken.brief || $t('not') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <router-link
          v-if="isLogined"
          :to="{ name: 'tokens' }"
          tag="div"
          class="balance"
        >
          {{ $t('token.owned') }}：{{ balance }} {{ minetokenToken.symbol }}
          <i class="el-icon-arrow-right" />
        </router-link>
        <div class="share-btn">
          <a
            :href="'http://rinkeby.etherscan.io/address/' + minetokenToken.contract_address"
            target="_blank"
          >
            <el-button
              class="link-btn"
              size="small"
            >
              <svg-icon icon-class="eth_mini" />
              {{ $t('token.viewOnChain') }}
            </el-button>
          </a>
          <router-link
            v-if="showTokenSetting"
            :to="{ name: 'editminetoken' }"
          >
            <el-button
              class="btn"
              size="small"
              icon="el-icon-setting"
            >
              {{ $t('token.edit') }}
            </el-button>
          </router-link>
          <el-button
            class="btn"
            size="small"
            @click="shareModalShow = true"
          >
            <svg-icon icon-class="share_new" />
            {{ $t('share') }}
          </el-button>
        </div>
 
        <p
          v-if="!minetokenToken.contract_address"
          class="warning"
        >
          {{ $t('token.waitPatiently') }}
        </p>
      </div>
    </div>

    <el-row class="token-container">
      <el-col :span="17">
        <div class="introduction">
          <h2 class="token-title">
            {{ $t('token.introduction') }}
          </h2>
          <p class="token-introduction">
            <!-- 开了wrap 这个span不能换行！ -->
            <span class="wrap-open">{{ minetokenToken.introduction || $t('not') }}</span>
          </p>
        </div>

        <div class="total">
          <h2 class="token-title">
            {{ $t('token.statistics') }}
          </h2>
          <div class="fl total-content">
            <div class="token-data">
              <p class="token-num">
                {{ amount }}
                <sub>{{ minetokenToken.symbol }}</sub>
              </p>
              <p class="token-name">
                {{ $t('token.totalIssued') }}
              </p>
            </div>

            <div class="token-data">
              <p class="token-num">
                {{ cnyReserve }}
                <sub>CNY</sub>
                + {{ tokenReserve }}
                <sub>{{ minetokenToken.symbol }}</sub>
              </p>
              <p class="token-name">
                {{ $t('token.liquidGoldPool') }}
              </p>
            </div>

            <div class="token-data">
              <p class="token-num">
                {{ volume }}
                <sub>{{ minetokenToken.symbol }}</sub>
              </p>
              <p class="token-name">
                {{ $t('token.volume24h') }}
              </p>
            </div>

            <div class="token-data">
              <p class="token-num">
                {{ exchangeAmount }}
                <sub>CNY</sub>
              </p>
              <p class="token-name">
                {{ $t('token.turnover24h') }}
              </p>
            </div>

            <div class="token-data">
              <p
                :style="{color: color}"
                class="token-num"
              >
                {{ change }}
              </p>
              <p class="token-name">
                {{ $t('token.change24h') }}
              </p>
            </div>

            <div class="token-data">
              <p class="token-num">
                {{ price }}
                <sub>CNY</sub>
              </p>
              <p class="token-name">
                {{ $t('token.currentPrice') }}
              </p>
            </div>
          </div>
        </div>

        <div class="detail">
          <mineTokensNav v-model="tabPage" />
          <div class="line" />
          <slot />
        </div>

        <tokenRelated class="related" />
      </el-col>
      <el-col :span="7">
        <!-- <router-link class="exchange" :to="{name: 'exchange'}">
          <svg-icon
            class="tokens"
            icon-class="token"
          />
          Fan票交易所
        </router-link>-->
        <tokenBuyCard :token="minetokenToken" />

        <TokenJoinFandom
          :token-symbol="minetokenToken.symbol || ''"
          :token-id="Number($route.params.id)"
          :balance="balance"
        />

        <div class="about">
          <h2 class="token-title">
            {{ $t('social.relatedWebsites') }}
          </h2>
          <ul v-if="resourcesWebsites.length !== 0">
            <li
              v-for="(item, index) in resourcesWebsites"
              :key="index"
            >
              <a
                :href="formatUrl(item)"
                target="_blank"
              >{{ item }}</a>
            </li>
          </ul>
          <span
            v-else
            class="not"
          >{{ $t('not') }}</span>
        </div>

        <div class="social">
          <h2 class="token-title">
            {{ $t('social.socialAccount') }}
          </h2>

          <div
            v-if="resourcesSocialss.length !== 0"
            class="social-btn"
          >
            <div
              v-for="(item, index) in resourcesSocialss"
              :key="index"
              class="circle"
            >
              <socialIcon
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
        </div>

        <div class="share">
          <h2 class="token-title">
            {{ $t('token.shareWidget') }}
          </h2>
          <el-input
            v-model="tokenWidget"
            :rows="6"
            class="token-widget"
            type="textarea"
            :placeholder="$t('rule.content')"
          />
        </div>
      </el-col>
    </el-row>
    <Share
      :share-modal-show="shareModalShow"
      :img="logo"
      :minetoken-token="minetokenToken"
      :minetoken-user="minetokenUser"
      @input="val => shareModalShow = val"
    />
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import TokenJoinFandom from './token_join_fandom'
import avatar from '@/components/avatar/index.vue'
import mineTokensNav from '@/components/user/minetokens_nav.vue'
import Share from '@/components/token/token_share.vue'
import tokenBuyCard from '@/components/token/token_buy_card.vue'
import socialIcon from '@/components/social_icon/index.vue'
import tokenRelated from '@/components/token/token_related.vue'
import socialTypes from '@/config/social_types.js'
import { precision } from '@/utils/precisionConversion'
import utils from '@/utils/utils'

export default {
  components: {
    avatar,
    mineTokensNav,
    Share,
    socialIcon,
    tokenBuyCard,
    tokenRelated,
    TokenJoinFandom
  },
  props: {
    minetokenToken: {
      type: Object,
      required: true
    },
    minetokenUser: {
      type: Object,
      required: true
    },
    minetokenExchange: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      shareModalShow: false,
      tokenWidget: `<iframe width="100%" height="200px" src='${process.env.VUE_APP_URL}/widget/token/?id=${this.$route.params.id}' frameborder=0></iframe>`,
      resourcesSocialss: [],
      resourcesWebsites: [],
      showTokenSetting: false,
      tabPage: Number(this.$route.query.tab) || 0,
      balance: 0
    }
  },
  computed: {
    ...mapGetters(['currentUserInfo', 'isLogined']),
    logo() {
      if (!this.minetokenToken.logo) return ''
      return this.minetokenToken.logo
        ? this.$ossProcess(this.minetokenToken.logo, { h: 160 })
        : ''
    },
    amount() {
      const tokenamount = precision(
        this.minetokenToken.total_supply || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    tokenReserve() {
      const tokenamount = precision(
        this.minetokenExchange.token_reserve || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    cnyReserve() {
      const tokenamount = precision(
        this.minetokenExchange.cny_reserve || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    volume() {
      const tokenamount = precision(
        this.minetokenExchange.volume_24h || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    exchangeAmount() {
      const tokenamount = precision(
        this.minetokenExchange.amount_24h || 0,
        'CNY',
        this.minetokenToken.decimals
      )
      return this.$publishMethods.formatDecimal(tokenamount, 4)
    },
    change() {
      if (this.minetokenExchange.change_24h) {
        const amount =
          (this.minetokenExchange.change_24h * 100).toFixed(2) + '%'
        if (parseInt(amount) > 0) return '+' + amount
        return amount
      } else return '0%'
    },
    price() {
      // const tokenamount = precision(this.minetokenExchange.price || 0, 'CNY', this.minetokenToken.decimals)
      // return this.$publishMethods.formatDecimal(tokenamount, 4)
      return this.minetokenExchange.price || 0
    },
    color() {
      // 显示转换
      const amount = parseFloat(this.change)
      if (amount < 0) return '#d74e5a'
      else if (amount > 0) return '#41b37d'
      else return 'rgb(153, 153, 153)'
    },
    friendlyDate() {
      return moment(this.minetokenToken.create_time).format('lll')
    }
  },
  watch: {
    currentUserInfo() {
      // 第一次会重复请求两次接口
      if (this.currentUserInfo.id) this.tokenUserId(this.currentUserInfo.id)
    },
    tabPage(val) {
      this.$router.replace({
        query: {
          tab: this.tabPage
        }
      })
      this.$route.query.page = 1 // This is a hack. It wasted me a lot of time!!!
      this.$emit('input', val)
    },
    isLogined(val) {
      if (val) {
        this.getUserBalance()
      }
    }
  },
  created() {
    this.minetokenGetResources(this.$route.params.id)
  },
  mounted() {
    if (this.currentUserInfo.id) this.tokenUserId(this.currentUserInfo.id)
    if (this.isLogined) this.getUserBalance()
  },
  methods: {
    async minetokenGetResources(id) {
      await this.$API
        .minetokenGetResources(id)
        .then(res => {
          if (res.code === 0) {
            const socialFilter = res.data.socials.filter(i =>
              socialTypes.includes(i.type)
            ) // 过滤
            const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
            this.resourcesSocialss = socialFilterEmpty
            this.resourcesWebsites = res.data.websites
          } else {
            this.$message.success(res.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserBalance() {
      this.$API.getUserBalance(Number(this.$route.params.id)).then(res => {
        if (res.code === 0) {
          this.balance = parseFloat(utils.fromDecimal(res.data, 4))
        }
      })
    },
    async tokenUserId(id) {
      await this.$API
        .tokenUserId(id)
        .then(res => {
          if (res.code === 0 && res.data.id > 0) {
            this.showTokenSetting =
              res.data.id === Number(this.$route.params.id)
          }
        })
        .catch(err => console.log('get token user error', err))
    },
    formatUrl(url) {
      const isHttp = url.indexOf('http://')
      const isHttps = url.indexOf('https://')
      if (isHttp !== 0 && isHttps !== 0) url = 'http://' + url
      return url
    }
  }
}
</script>
<style lang="less" scoped>
.token {
  .minHeight();
}

.container-padding {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
}

.token-detail {
  position: relative;
  margin: 20px auto 0;
  padding: 20px;
  background: @white;
  border-radius: @br10;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
}
.info-line {
  margin: 6px 0;
}
.token-detail-info {
  width: 60%;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 400;
  color: @black;
  line-height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.token-info-title {
  // width: 70px;
  flex: 0 0 80px;
  &.bold {
    font-weight: bold;
    font-size: 24px;
  }
}
.token-info-sub {
  padding: 0 0 0 10px;
  margin: 0;
  a {
    color: #542de0;
  }
}
.share-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  .btn {
    padding: 7px 21px;
    font-size: 14px;
    border-radius: 6px;
    margin-left: 5px;
  }
  .link-btn {
    padding: 7px 7px;
    font-size: 14px;
    border-radius: 6px;
  }
}

.token-container {
  max-width: 1200px;
  width: 100%;
  margin: 20px auto 40px;

  .el-col-17 {
    padding-left: 10px;
    padding-right: 10px;
  }
  .el-col-7 {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.introduction {
  background: @white;
  padding: 20px;
  border-radius: @br10;
}

.token-title {
  font-size: 24px;
  font-weight: bold;
  color: @black;
  line-height: 33px;
  padding: 0;
  margin: 0;
}
.token-introduction {
  font-size: 16px;
  font-weight: 400;
  color: @black;
  line-height: 22px;
  padding: 0;
  margin: 20px 0 0;
}

.total,
.detail,
.about,
.social,
.share,
.related {
  background: @white;
  padding: 20px;
  border-radius: @br10;
  margin: 20px 0 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.04);
}
.total-content {
  margin-top: 20px;
  flex-wrap: wrap;
}

.token-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 40px 10px 0;
  &:nth-last-child(1) {
    margin-right: 0;
  }
}
.token-num {
  font-size: 20px;
  font-weight: bold;
  color: @purpleDark;
  line-height: 28px;
  padding: 0;
  margin: 0;
  sub {
    bottom: 0;
  }
}
.token-name {
  font-size: 14px;
  color: @black;
  line-height: 20px;
  padding: 0;
  margin: 6px 0 0;
}

.exchange {
  border-radius: 20px;
  display: block;
  background: @purpleDark;
  text-align: center;
  color: @white;
  font-size: 16px;
  line-height: 22px;
  padding: 10px 0;
  .tokens {
    font-size: 18px;
  }
}

.about ul {
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
      font-size: 16px;
      color: @black;
      line-height: 22px;
      text-decoration: underline;
    }
  }
}

.social-btn {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
}
.circle {
  // flex: 0 0 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 10px 8px 0;
  &:nth-child(6n) {
    margin-right: 0;
  }
}
.circle-btn {
  width: 40px;
  height: 40px;
  background-color: @black;
  flex: 0 0 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @white;
  box-sizing: border-box;
  cursor: pointer;
}
.token-widget {
  margin-top: 20px;
}
.line {
  height: 1px;
  background: #dbdbdb;
  margin: 20px 0;
}

.not {
  color: #333;
  font-style: 14px;
  padding-top: 20px;
  display: inline-block;
}

.help-link {
  font-size: 14px;
  color: #868686;
  text-decoration: underline;
  margin-left: 20px;
}
.balance {
  position: absolute;
  font-weight: 400;
  font-size: 16px;
  right: 20px;
  top: 20px;
  cursor: pointer;
  &:hover {
    color: #542de0;
  }
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

// 小于992
@media screen and (max-width: 992px) {
  .token-container {
    .el-col-17 {
      width: 100%;
      margin-bottom: 10px;
    }
    .el-col-7 {
      width: 100%;
    }
  }
}

// <600
@media screen and (max-width: 600px){
  .token-title {
    font-size: 20px;
  }
  .balance,
  .share-btn {
    position: initial;
    margin-top: 10px;
  }
  .token-detail {
    padding: 10px;
  }
  .token-detail-info {
    width: 100%;
  }
  .token-detail /deep/ .g-avatar {
    width: 60px !important;
    height: 60px !important;
  }

  .token-info-title.bold {
    font-size: 20px;
  }
  .token-detail-info,
  .balance {
    font-size: 14px;
  }

  .token-introduction {
    font-size: 14px;
    margin-top: 10px;
  }

  .token-data {
    margin: 10px 0;
    width: 100%;
    text-align: center;
  }
}


</style>
