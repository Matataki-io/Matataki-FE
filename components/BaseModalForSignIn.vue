<template>
  <el-dialog
    :visible.sync="showModal"
    :modal="true"
    width="320px"
    custom-class="my-dialog br10"
  >
    <section
      v-if="step === 1"
      class="step"
    >
      <h1 class="step-title">
        选择授权方式
      </h1>
      <div class="btns">
        <button
          class="btn-base bg-black"
          @click="walletLogin('EOS')"
        >
          <div class="eos-logo">
            <img
              src="@/assets/img/eos_icon.svg"
              alt="EOS"
            >
          </div>
          <span>EOS 登录</span>
        </button>
        <button
          class="btn-base bg-blue"
          @click="walletLogin('ONT')"
        >
          <img
            src="@/assets/img/icon_logo_ont.svg"
            alt="ONT"
          >
          <span>ONT 登录</span>
        </button>
        <button
          class="btn-base bg-purple"
          @click="walletLogin('GitHub')"
        >
          <img
            src="@/assets/img/github.png"
            alt="github"
          >
          <span>Github 登录</span>
        </button>
        <div class="guide">
          <a
            target="_blank"
            href="https://www.matataki.cn/p/515"
          >EOS登录指南</a>
          <a
            target="_blank"
            href="https://www.matataki.cn/p/516"
          >ONT登录指南</a>
        </div>
      </div>
    </section>
    <section
      v-if="step === 2"
      class="step"
    >
      <h1 class="step-title">
        EOS钱包
      </h1>
      <div class="wallet">
        <a
          v-for="(itemWallet, indexWallet) in wallet.eos"
          :key="indexWallet"
          :href="itemWallet.href"
          target="_blank"
        >
          <img
            :src="itemWallet.url"
            :alt="itemWallet.alt"
          >
        </a>
      </div>
      <h1 class="step-title">
        ONT钱包
      </h1>
      <div class="wallet">
        <a
          v-for="(itemWallet, indexWallet) in wallet.ont"
          :key="indexWallet"
          :href="itemWallet.href"
          target="_blank"
        >
          <img
            :src="itemWallet.url"
            :alt="itemWallet.alt"
          >
        </a>
      </div>
    </section>
    <div
      class="footer-arrow"
      @click="step === 1 ? (step = 2) : (step = 1)"
    >
      <div
        v-if="step === 2"
        class="arrow"
      >
        <i class="el-icon-arrow-left" />
      </div>
      <span>{{ step === 1 ? '查看支持的钱包' : '返回登录' }}</span>
      <div
        v-if="step === 1"
        class="arrow"
      >
        <i class="el-icon-arrow-right" />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import iconEOS from '@/assets/img/icon_logo_eos.svg'
import iconTokenpocket from '@/assets/img/icon_tokenpocket.svg'
import iconMathwallet from '@/assets/img/icon_mathwallet.svg'
import iconScatter from '@/assets/img/icon_scatter.svg'
import iconONT from '@/assets/img/icon_logo_ont.svg'
import iconCyano from '@/assets/img/icon_cyano.svg'
import iconLeafwallet from '@/assets/img/icon_leafwallet.svg'
import iconChallte from '@/assets/img/icon_challte.svg'
import iconMeet from '@/assets/img/icon_meet.svg'
import iconGithub from '@/assets/img/icon_logo_github.svg'
import iconOnto from '@/assets/img/icon_logo_onto.svg'
import iconImtoken from '@/assets/img/icon_logo_imtoken.svg'

export default {
  name: 'BaseModalForSignIn',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showModal(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.showModal = val
    }
  },
  computed: {
    ...mapState(['userConfig']),
    ...mapGetters(['currentUserInfo'])
  },
  data() {
    return {
      step: 1,
      wallet: {
        eos: [
          {
            url: iconTokenpocket,
            href: 'https://www.tokenpocket.pro/',
            alt: 'https://www.tokenpocket.pro/'
          },
          {
            url: iconScatter,
            href: 'https://get-scatter.com/',
            alt: 'https://get-scatter.com/'
          },
          {
            url: iconChallte,
            href: 'http://eblock.io/',
            alt: 'http://eblock.io/'
          },
          {
            url: iconMathwallet,
            href: 'http://mathwallet.net/',
            alt: 'http://mathwallet.net/'
          },
          {
            url: iconLeafwallet,
            href: 'https://www.leafwallet.io/',
            alt: 'https://www.leafwallet.io/'
          },
          {
            url: iconMeet,
            href: 'https://meet.one/',
            alt: 'https://meet.one/'
          },
          {
            url: iconImtoken,
            href: 'https://token.im/download',
            alt: 'https://token.im/download'
          }
        ],
        ont: [
          {
            url: iconOnto,
            href: 'https://onto.app/',
            alt: 'https://onto.app/'
          },
          {
            url: iconCyano,
            href:
              'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm',
            alt:
              'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm'
          },
          {
            url: iconMathwallet,
            href: 'http://mathwallet.net/',
            alt: 'http://mathwallet.net/'
          }
        ]
      },
      showModal: false,
      modalLoading: false,
      modalText: {
        text: '选择授权方式'
      },
      iconGithub,
      idProvider: [
        {
          url: iconEOS,
          title: 'EOS登录',
          type: 'EOS',
          wallet: [
            {
              url: iconTokenpocket,
              href: 'https://www.tokenpocket.pro/',
              alt: 'https://www.tokenpocket.pro/'
            },
            {
              url: iconScatter,
              href: 'https://get-scatter.com/',
              alt: 'https://get-scatter.com/'
            },
            {
              url: iconChallte,
              href: 'http://eblock.io/',
              alt: 'http://eblock.io/'
            },
            {
              url: iconMathwallet,
              href: 'http://mathwallet.net/',
              alt: 'http://mathwallet.net/'
            },
            {
              url: iconLeafwallet,
              href: 'https://www.leafwallet.io/',
              alt: 'https://www.leafwallet.io/'
            },
            {
              url: iconMeet,
              href: 'https://meet.one/',
              alt: 'https://meet.one/'
            },
            {
              url: iconImtoken,
              href: 'https://token.im/download',
              alt: 'https://token.im/download'
            }
          ],
          doc: {
            title: '《如何使用EOS登录》',
            href: 'https://www.matataki.cn/p/515'
          }
        },
        {
          url: iconONT,
          title: 'ONT登录',
          type: 'ONT',
          wallet: [
            {
              url: iconOnto,
              href: 'https://onto.app/',
              alt: 'https://onto.app/'
            },
            {
              url: iconCyano,
              href:
                'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm',
              alt:
                'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm'
            },
            {
              url: iconMathwallet,
              href: 'http://mathwallet.net/',
              alt: 'http://mathwallet.net/'
            }
          ],
          doc: {
            title: '《如何使用ONT登录》',
            href: 'https://www.matataki.cn/p/516'
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['signIn']),
    async walletLogin(type) {
      this.modalLoading = true
      if (type === 'GitHub') {
        this.$router.push({ name: 'login-github' })
        return
      }
      await this.signInx(type)
      this.modalLoading = false
    },
    async signInx(type) {
      try {
        await this.signIn({ idProvider: type })
        this.$store.commit('setLoginModal', false)
        this.$backendAPI.accessToken = this.currentUserInfo.accessToken
      } catch (error) {
        try {
          await this.signIn({ idProvider: type })
          this.$store.commit('setLoginModal', false)
          this.$backendAPI.accessToken = this.currentUserInfo.accessToken
        } catch (err) {
          console.log('signInx 错误', err)
          this.$message.error('登录失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer-arrow {
  cursor: pointer;
  width: 100%;
  background: #f1f1f1;
  padding: 14px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  color: #b2b2b2;
  .arrow {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #b2b2b2;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    i {
      font-size: 8px;
    }
  }
}
.step {
  text-align: center;
  padding-bottom: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  .wallet {
    max-width: 250px;
    margin-bottom: 20px;
    a {
      margin: 0 10px 10px 0;
      img {
        width: 48px;
        border-radius: 50%;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .guide {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 195px;
  }
  .step-title {
    font-size: 20px;
    line-height: 28px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .btn-base {
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #ffffff;
    width: 195px;
    height: 40px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    .eos-logo {
      width: 18px;
      height: 18px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 10px;
      }
    }
    img {
      width: 18px;
    }
    span {
      font-size: 14px;
      font-weight: 700;
      margin-left: 10px;
    }
  }
  .bg-black {
    background: #333333;
  }
  .bg-blue {
    background: #4d9afd;
  }
  .bg-purple {
    background: #882592;
  }
}
.info-content {
  margin: 0 30px;
  transition: all 0.3s;
  &-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.7);
    margin: 20px 0 48px;
  }

  .modal-login {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .modal-body {
    flex: 0 0 50%;
    text-align: center;
    margin: 0 14px;
    transition: all 0.3s;
    &-content {
      background-color: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 14px 0;
      height: 220px;
    }

    &-head {
      width: 100%;
      background: #e6e6e6;
      padding: 7px 0;
      margin: 0 0 10px 0;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.7);
    }

    .modal-logo {
      flex: 1;
      display: flex;
      align-items: flex-end;
      width: 100%;
      padding: 0 20px;
      &-button {
        text-align: center;
        color: #fff;
        margin: 16px 0 0;
        padding: 0;
        flex: 1;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #eee;
        &.active0 {
          background: #444;
        }
        &.active1 {
          background: #4d9afd;
        }
        img {
          height: 16px;
          padding: 0;
          margin: 8px 8px 8px 0;
          cursor: pointer;
          box-sizing: border-box;
        }
        span {
          font-size: 14px;
          font-weight: 400;
          padding: 0;
          margin: 0;
        }
      }
    }
    .modal-wallet {
      border-radius: 16px;
      padding: 0;
      margin: 0;
      text-align: center;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 120px;
      flex-wrap: wrap;
      a {
        display: inline-block;
        padding: 0;
        width: 28px;
        height: 28px;
        margin: 5px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .modal-doc {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 118, 255, 1);
      margin: 34px 0 28px 0;
      display: inline-block;
    }
  }
  .modal-loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
