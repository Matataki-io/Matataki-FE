<template>
  <div>
    <div
      v-show="status === 'loading'"
      v-loading="status === 'loading'"
      class="telegram-loading"
    />
    <div
      v-show="status === 'error'"
      class="telegram-error"
    >
      <i class="el-icon-refresh" />
      <a
        href="javascript:;"
        @click="createScript"
      >重试</a>
    </div>
    <div
      v-show="status === 'completed'"
      ref="telegram"
    />
    <a
      v-show="status === 'completed'"
      class="telegram-toggleaccount"
      href="https://www.matataki.cn/p/2465"
      target="_blank"
    >
      切换账号教程<svg-icon
        icon-class="share3"
        class="icon"
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'TelegramLogin',
  props: {
    mode: {
      type: String,
      required: true,
      validator(value) { return ['callback', 'redirect'].includes(value) }
    },
    telegramLogin: {
      type: String,
      required: true,
      validator(value) { return value.endsWith('bot') || value.endsWith('Bot') }
    },
    redirectUrl: {
      type: String,
      default: ''
    },
    requestAccess: {
      type: String,
      default: 'read',
      validator(value) { return ['read', 'write'].includes(value) }
    },
    size: {
      type: String,
      default: 'large',
      validator(value) { return ['small', 'medium', 'large'].includes(value) }
    },
    userpic: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: '' // loading completed error
    }
  },
  mounted() {
    // https://core.telegram.org/widgets/login
    if (process.browser) this.createScript()
  },
  methods: {
    createScript() {
      this.status = 'loading'
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://telegram.org/js/telegram-widget.js?7'
      script.onload = () => {
        // 因为加载tg的script需要一点时间, 所以这里延时了显示内容
        let timer = null
        timer = setTimeout(() => {
          clearTimeout(timer)
          this.status = 'completed'
        }, 500)
      }
      script.onerror = () => {
        this.status = 'error'
      }
      /*
      src: '',
      'data-telegram-login': 'matataki_bot',
      'data-size': 'large',
      'data-onauth': 'onTelegramAuth(user)',
      'data-request-access': 'write'
      */
      script.setAttribute('data-size', this.size)
      script.setAttribute('data-userpic', this.userpic)
      script.setAttribute('data-telegram-login', this.telegramLogin)
      script.setAttribute('data-request-access', this.requestAccess)
      if (this.radius) { script.setAttribute('data-radius', this.radius) }
      if (this.mode === 'callback') {
        window.onTelegramAuth = this.onTelegramAuth
        script.setAttribute('data-onauth', 'window.onTelegramAuth(user)')
      } else {
        script.setAttribute('data-auth-url', this.redirectUrl)
      }
      this.$refs.telegram.innerHTML = ''
      this.$refs.telegram.appendChild(script)
    },
    onTelegramAuth(user) {
      this.$emit('callback', user)
    }
  }
}
</script>

<style lang="less" scoped>
.telegram-loading {
  min-width: 100px;
}
.telegram-error {
  text-align: center;
  font-size: 16px;
  a {
    color: #0000EE;
    &:hover {
      text-decoration: underline;
    }
  }
}
.telegram-toggleaccount {
  font-size: 14px;
  padding: 0;
  margin: 6px 0 0 0;
  color: #0000EE;
  &:hover {
    text-decoration: underline;
  }
}
</style>
