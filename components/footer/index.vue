<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="content footer-c6">
        <div class="nav">
          <a
            class="href"
            target="_blank"
            href="https://www.yuque.com/matataki"
          >
            {{ $t('footer.helpAndSupport') }}
          </a>
          <a
            class="href"
            target="_blank"
            href="https://www.yuque.com/matataki/matataki"
          >
            {{ $t('footer.hellpbook') }}
          </a>
          <a
            class="href"
            target="_blank"
            href="https://www.matataki.cn/p/781"
          >
            {{ $t('footer.point') }}
          </a>
          <!-- 隐私政策与用户协议 -->
          <!-- 去掉链接 -->
          <a
            class="href"
            target="_blank"
          >
            {{ $t('footer.privacyPolicy') }}
          </a>
          <a
            class="href"
            target="_blank"
          >
            {{ $t('footer.userAgreement') }}
          </a>
          <!-- 保留链接 -->
          <!-- <a class="href" target="_blank" href="/policy">
            {{ $t('footer.privacyPolicy') }}
          </a>
          <a class="href" target="_blank" href="/agreement">
            {{ $t('footer.userAgreement') }}
          </a> -->
          <a
            class="href"
            target="_blank"
            href="https://github.com/Matataki-io/Matataki-FE"
          >
            {{ $t('footer.about') }}
          </a>
          <a
            class="href"
            target="_blank"
            href="https://www.yuque.com/matataki/matataki_version"
          >
            {{ $t('footer.updateRecord') }}
          </a>
          <a
            class="href"
            target="_blank"
            href="http://www.matataki.cn/p/616"
          >
            {{ $t('footer.billboard') }}
          </a>
        </div>
        <p class="link">
          {{ $t('footer.link') }}:
          <a
            href="https://matters.news/"
            target="_blank"
          >
            Matters
          </a>
          |
          <a
            href="https://maskbook.com/"
            target="_blank"
          >
            Maskbook
          </a>
          |
          <a
            href="https://orange.xyz/"
            target="_blank"
          >
            {{ $t('footer.orange') }}
          </a>
          |
          <a
            href="https://www.defi.wtf"
            target="_blank"
          >
            DeFi.wtf
          </a>
        </p>
        <p>
          <language />
        </p>
      </div>
      <div class="footer-c4">
        <div>
          <img
            class="logo"
            src="@/assets/img/footer_logo1.png"
            alt="logo"
          >
          <a
            target="_blank"
            href="https://jq.qq.com/?_wv=1027&k=gY0RKj2t"
            title="群号：766605671"
          >
            <svg-icon
              class="icon qq-icon"
              icon-class="qq"
            />
          </a>
          <div class="icon wechat-icon">
            <div class="wechat">
              <div class="wechat-img">
                <img
                  src="@/assets/img/wechat-group.png"
                  alt="code"
                >
                <p class="wechat-title">
                  {{ $t('footer.scanCode') }}
                </p>
              </div>
              <div class="wechat-img">
                <img
                  src="@/assets/img/wechat-public.png"
                  alt="code"
                >
                <p class="wechat-title">
                  {{ $t('footer.follow') }}
                </p>
              </div>
            </div>
          </div>
          <a
            target="_blank"
            href="https://github.com/Matataki-io/Matataki-FE"
          >
            <div class="icon github-icon" />
          </a>
          <a
            target="_blank"
            href="https://t.me/smartsignature_io"
          >
            <div class="icon telegram-icon" />
          </a>
          <!-- <a
            target="_blank"
            href="https://twitter.com/realmatataki"
          >
            <svg-icon
              class="icon twitter-icon"
              icon-class="twitter"
            />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/MatatakiOfficial/"
          >
            <div class="icon facebook-icon" />
          </a> -->
        </div>
        <p class="copyright">
          Copyright © 2018-2020 ANDOROMEDA TECH.ltd
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import language from '../header/language'
export default {
  components: {
    language
  },
}
</script>

<style lang="less" scoped>
.footer {
  height: 180px;
  background: #333333;
  padding-top: 52px;
  padding-bottom: 52px;
  box-sizing: border-box;
  &-content {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .footer-c6 {
    width: 60%;
  }
  .footer-c4 {
    width: 40%;
  }
}

.logo {
  width: 178px;
}
.content {
  .nav {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .href {
      margin-right: 20px;
      text-decoration: none;
      font-size: 14px;
      color: rgba(178, 178, 178, 1);
      line-height: 22px;
      &:hover {
        color: #fff;
      }
    }
  }
}

.icon {
  margin-left: 22px;
  display: inline-block;
  cursor: pointer;
  .wechat {
    display: none;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: -200px;
    left: -146px;
    width: 310px;
    background: #fff;
    border-radius: 6px;
    padding: 14px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &-img {
      text-align: center;
    }
    &-title {
      padding: 0;
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      color: #000;
    }
    &::after {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      content: "";
      width: 0;
      height: 0;
      border: 10px solid #fff;
      border-color: #fff transparent transparent;
    }
    img {
      border: 1px solid #eee;
      width: 130px;
      box-sizing: border-box;
    }
  }
  &:hover .wechat {
    display: flex;
  }
  &.wechat-icon {
    width: 28px;
    height: 23px;
    position: relative;
    background-image: url("../../assets/img/footer_wechat.svg");
    &:hover {
      background-image: url("../../assets/img/footer_wechat_active.svg");
    }
  }
  &.github-icon {
    width: 22px;
    height: 24px;
    background-image: url("../../assets/img/footer_github.svg");
    &:hover {
      background-image: url("../../assets/img/footer_github_active.svg");
    }
  }
  &.telegram-icon {
    width: 25px;
    height: 21px;
    background-image: url("../../assets/img/footer_telegram.svg");
    &:hover {
      background-image: url("../../assets/img/footer_telegram_active.svg");
    }
  }
  &.twitter-icon {
    width: 24px;
    height: 24px;
    color: #b2b2b2;
    &:hover {
      color: #00aced;
    }
  }
  &.facebook-icon {
    width: 24px;
    height: 24px;
    background-image: url("../../assets/img/footer_facebook.svg");
    &:hover {
      background-image: url("../../assets/img/footer_facebook_active.svg");
    }
  }
  &.qq-icon {
    width: 28px;
    height: 28px;
    color: #b2b2b2;
    &:hover {
      color: #12b7f5;
    }
  }
}
.copyright {
  font-size: 14px;
  color: rgba(178, 178, 178, 1);
  line-height: 22px;
  margin: 10px 0 0;
}

.link {
  margin: 10px 0 0;
  font-size: 14px;
  color: rgba(178, 178, 178, 1);
  line-height: 22px;
  a {
    color: rgba(178, 178, 178, 1);
    text-decoration: none;
    margin: 0 4px;
    &:nth-child(1) {
      margin-left: 12px;
    }
    &:hover {
      color: #fff;
    }
  }
}
.footer-content {
  flex-direction: row;
  align-items: flex-start;
}
// 小于1200
@media screen and (max-width: 1200px) {
  .footer {
    .footer-c4 {
      text-align: center;
      .logo {
        display: block;
        margin: 0 auto 10px;
      }
      .icon.wechat-icon {
        margin-left: 0;
      }
    }
  }
}
// 小于900
@media (max-width: 900px) {
  .footer {
    height: auto;
  }
  .footer-content {
    flex-direction: column;
    .content {
      margin-bottom: 20px;
      .nav {
        justify-content: center;
        .href:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
    }
    .footer-c6 {
      width: 90%;
      text-align: center;
    }
    .footer-c4 {
      width: 90%;
    }
  }
}
</style>
