<template>
  <div>
    <div class="fl ac coins-head">
      <h2 class="tag-title">
        {{ isPost ? $t('user.issuecoins') : $t('user.editcoins') }}
      </h2>
      <!-- <el-tooltip v-if="isPost" effect="dark" content="如何发行Fan票?" placement="top-start">
        <svg-icon
          class="help-icon"
          icon-class="help"
        />
      </el-tooltip> -->

      <a
        class="help-link"
        target="_blank"
        href="https://www.matataki.cn/p/977"
      >什么是Fan票?</a>
      &nbsp;
      <a
        class="help-link"
        target="_blank"
        href="https://www.matataki.cn/p/980"
      >如何发行Fan票?</a>

      <div
        v-if="!isPost"
        class="click-box"
      >
        <router-link :to="{name: 'token-id', params: { id: tokenId || 0}}">
          <el-button size="small">
            详情
          </el-button>
        </router-link>
        <el-button
          :loading="addToLoading"
          size="small"
          @click="addCoins"
        >
          增发
        </el-button>
        <router-link :to="{name: 'exchange', hash: '#swap', query: { output: form.symbol }}">
          <el-button
            size="small"
            type="primary"
          >
            交易
          </el-button>
        </router-link>
      </div>
    </div>

    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      class="input-form"
      label-width="80px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          class="input"
          placeholder="请输入Fan票名称"
        />
      </el-form-item>

      <el-form-item
        label="缩写"
        prop="symbol"
      >
        <el-input
          v-model="form.symbol"
          :disabled="!isPost"
          class="input"
          placeholder="请输入Fan票缩写(发行后不可修改)"
        />
      </el-form-item>
      <el-form-item
        label="图标"
        prop="logo"
      >
        <el-input
          v-model="form.logo"
          style="display: none;"
          class="input"
        />
        <img-upload
          v-show="!coinsCover"
          :img-upload-done="imgUploadDone"
          update-type="coins"
          class="coins-upload-content"
          @doneImageUpload="doneImageUpload"
        >
          <div
            slot="uploadButton"
            class="coins-upload"
          >
            <i class="el-icon-plus add" />
          </div>
        </img-upload>
        <div
          v-show="coinsCover"
          class="coina-cover"
        >
          <el-image
            :src="coinsCover"
            fit="cover"
            class="tokens-image"
          />
          <div
            class="cover-full"
            @click="removeCoinsIcon"
          >
            <i class="el-icon-delete remove" />
          </div>
        </div>
      </el-form-item>
      <!-- 编辑页面不需要显示 -->
      <el-form-item
        v-if="isPost"
        label="发行数量"
        prop="number"
      >
        <el-input
          v-model="form.number"
          class="input"
          placeholder="请输入首次发行数量(最多发行1亿)"
        />
      </el-form-item>

      <el-form-item
        label="简介"
        prop="brief"
      >
        <el-input
          v-model="form.brief"
          class="input"
          maxlength="50"
          placeholder="简介"
        />
      </el-form-item>
      <el-form-item
        label="介绍"
        prop=""
      >
        <el-input
          v-model="form.introduction"
          :rows="6"
          class="input"
          type="textarea"
          maxlength="500"
          show-word-limit
          placeholder="介绍"
        />
      </el-form-item>

      <el-form-item
        :label="$t('social.relatedWebsites')"
        prop=""
      >
        <div
          v-for="(item, index) in about"
          :key="index"
          class="fl ac about-input"
        >
          <el-input
            v-model="about[index]"
            class="input"
            :placeholder="$t('social.fillLink')"
          />
          <!-- <div v-if="index === 0" class="about-input-btn" @click="aboutAdd">
            <i class="el-icon-plus" />
          </div> -->

          <div
            v-if="about.length > 1"
            class="about-input-btn"
            @click="abountLess(index)"
          >
            <i class="el-icon-minus" />
          </div>
        </div>

        <div
          v-if="about.length < 5"
          class="about-input-btn add"
          @click="aboutAdd"
        >
          <i class="el-icon-plus" />
        </div>
      </el-form-item>

      <el-form-item
        :label="$t('social.socialAccount')"
        prop=""
      >
        <div
          v-for="(item, index) in social"
          :key="index"
          class="social-item"
        >
          <p class="social-title">
            {{ item.name }}
            <span v-html="item.tooltip" />
          </p>
          <div class="fl">
            <div class="social-icons">
              <socialIcon :icon="item.symbol" />
            </div>
            <el-input
              v-model="item.value"
              :placeholder="item.placeholder"
              class="social-input"
            />
          </div>
        </div>
      </el-form-item>

      <el-form-item style="margin:40px 0 0 0;">
        <el-checkbox
          v-if="isPost"
          v-model="form.agree"
        >
          我声明Fan票为本人自愿发行，由本人承担一切法律责任
        </el-checkbox>
        <el-button
          :disabled="!form.agree"
          type="primary"
          class="publish-btn"
          @click="submitForm('form')"
        >
          {{ isPost ? '发行Fan票' : '保存' }}
        </el-button>
        <p
          v-if="isPost"
          class="tips"
        >
          创建Fan票过程需要上链，请耐心等候。
        </p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imgUpload from '@/components/imgUpload/index.vue'
import { precision, toPrecision } from '@/utils/precisionConversion'
import { getCookie } from '@/utils/cookie'
import socialIcon from '@/components/social_icon/index.vue'
import socialTypes from '@/config/social_types'
export default {
  components: {
    imgUpload,
    socialIcon
  },
  data() {
    const checkSymbol = (rule, value, callback) => {
      const reg = /^[A-Z]+$/
      const res = reg.test(this.form.symbol)
      if (!res) {
        callback(new Error('Fan票缩写仅限大写英文字符'))
      } else {
        callback()
      }
    }
    return {
      tokenId: null,
      form: {
        name: '',
        symbol: '',
        number: '',
        logo: '',
        brief: '',
        introduction: '',
        agree: false
      },
      rules: {
        name: [
          { required: true, message: '请输入Fan票名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] }
        ],
        // 编辑页面不需要校验
        symbol: [
          { required: true, message: '请输入Fan票缩写', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: ['blur', 'change'] },
          { validator: checkSymbol, trigger: ['blur', 'change'] }
        ],
        logo: [
          { required: true, message: '请输上传图标' }
        ],
        // 编辑页面不需要校验
        number: [
          { required: true, message: '请输入首次发行数量', trigger: 'blur' },
          { min: 1, max: 9, message: '首次发行数量一亿', trigger: ['blur', 'change'] }
        ],
        brief: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 1, max: 100, message: '简介最多100字', trigger: ['blur', 'change'] }
        ]
      },
      imgUploadDone: 0, // 图片是否上传完成
      about: [''],
      social: [
        {
          symbol: 'QQ',
          icon: 'qq1',
          name: 'QQ：',
          tooltip: '',
          placeholder: this.$t('thirdParty.qqAccount'),
          url: '',
          value: ''
        },
        {
          symbol: 'Wechat',
          icon: 'wechat',
          name: `${this.$t('thirdParty.wechat')}：`,
          tooltip: '',
          placeholder: this.$t('thirdParty.wechatAccount'),
          url: '',
          value: ''
        },
        {
          symbol: 'Weibo',
          icon: 'weibo1',
          name: `${this.$t('thirdParty.weibo')}：`,
          tooltip: `(https://www.weibo.com/<span>${this.$t('thirdParty.account')}</span>)`,
          placeholder: this.$t('thirdParty.weibo') + this.$t('thirdParty.usernameNoFullUrl'),
          url: 'https://www.weibo.com',
          value: ''
        },
        {
          symbol: 'Telegram',
          icon: 'tg',
          name: 'Telegram：',
          tooltip: '',
          placeholder: `Telegram ${this.$t('username')}`,
          url: '',
          value: ''
        },
        {
          symbol: 'Twitter',
          icon: 'twitter1',
          name: 'Twitter：',
          tooltip: `(https://twitter.com/<span>${this.$t('thirdParty.account')}</span>)`,
          placeholder: `Twitter${this.$t('thirdParty.usernameNoFullUrl')}`,
          url: 'https://twitter.com',
          value: ''
        },
        {
          symbol: 'Facebook',
          icon: 'fb',
          name: 'Facebook：',
          tooltip: `(https://facebook.com/<span>${this.$t('thirdParty.account')}</span>)`,
          placeholder: `Facebook${this.$t('thirdParty.usernameNoFullUrl')}`,
          url: 'https://facebook.com',
          value: ''
        },
        {
          symbol: 'Github',
          icon: 'github1',
          name: 'Github：',
          tooltip: `(https://github.com/<span>${this.$t('thirdParty.account')}</span>)`,
          placeholder: `Github${this.$t('thirdParty.usernameNoFullUrl')}`,
          url: 'https://github.com',
          value: ''
        }
      ],
      tokenDetailData: {},
      addToLoading: false
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
    coinsCover() {
      return this.form.logo ? this.$ossProcess(this.form.logo) : ''
    },
    isPost() {
      return this.$route.name === 'postminetoken'
    }
  },
  created() {
  },
  mounted() {
    if (!getCookie('ACCESS_TOKEN')) return this.$router.go(-1)
    this.tokenDetail()

    if (!this.isPost) this.form.agree = true
  },
  methods: {
    async tokenDetail() {
      await this.$API.tokenDetail().then(res => {
        if (res.code === 0) {
          if (res.data.token) {
            if (this.isPost) {
              this.$router.push({
                name: 'editminetoken'
              })
            } else {
              const { token } = res.data
              this.form.name = token.name
              this.form.symbol = token.symbol
              this.form.logo = token.logo
              this.form.brief = token.brief
              this.form.introduction = token.introduction
              this.tokenId = token.id
              this.tokenDetailData = res.data

              this.minetokenGetResources(token.id)
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async minetokenTokenId(id) {
      const { name, logo, brief, introduction } = this.form
      const data = {
        name: name,
        brief: brief,
        introduction,
        logo: logo
      }
      const res = await this.$API.minetokenTokenId(data, id)
      if (res.code === 0) return res.message
      else throw res.message
    },
    // 初始发fan票不需要调用mint接口
    async minetokenMint() {
      const { number } = this.form
      const data = {
        amount: toPrecision(number, 'CNY')
      }
      this.$message('正在增发中，请稍等片刻。')
      this.addToLoading = true
      const res = await this.$API.minetokenMint(data)
      this.addToLoading = false
      if (res.code === 0) {
        this.$message.success(res.message)
        this.tokenDetail()
      } else {
        this.$message.error(res.message)
      }
    },
    async minetokenResources(id) {
      const aboutArray = this.about.filter(i => i)
      const socialFilter = this.social.filter(i => socialTypes.includes(i.symbol))
      const socialArray = socialFilter.map(i => {
        return {
          type: i.symbol,
          content: i.value
        }
      })

      const data = {
        websites: aboutArray,
        socials: socialArray
      }
      const res = await this.$API.minetokenResources(data, id)
      if (res.code === 0) return res.message
      else throw res.message
    },
    async minetokenCreate() {
      const { name, symbol, logo, brief, introduction, number } = this.form
      const data = {
        name: name,
        symbol: symbol,
        decimals: 4,
        brief: brief,
        introduction,
        logo: logo,
        initialSupply: toPrecision(number, 'CNY') + '' // to string type
      }
      await this.$API.minetokenCreate(data)
        .then(res => {
          if (res.code === 0) this.minetokenDone(res.data)
          else this.$message.error(res.message)
        })
    },
    async minetokenGetResources(id) {
      await this.$API.minetokenGetResources(id).then(res => {
        if (res.code === 0) {
          const socialFilter = res.data.socials.filter(i => socialTypes.includes(i.type)) // 过滤
          const socialFilterEmpty = socialFilter.filter(i => i.content) // 过滤
          // this.resourcesSocialss = socialFilterEmpty

          socialFilterEmpty.map(i => {
            const index = this.social.findIndex(j => j.symbol === i.type)
            // ~ 运算符 用于判断index 为 -1的情况 如果index为-1 ~index 等于 0
            if (~index) this.social[index].value = i.content
          })
          // this.resourcesWebsites = res.data.websites
          this.about = res.data.websites.length > 0 ? res.data.websites : ['']
        } else {
          this.$message.success(res.message)
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    minetokenDone(data) {
      Promise.all([this.minetokenResources(data)])
        .then(values => {
          // console.log(values)
          this.$message.success(values[0])
          this.$router.push({
            name: 'minetoken'
          })
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    minetokenEdit(id) {
      Promise.all([this.minetokenTokenId(id), this.minetokenResources(id)])
        .then(values => {
          // console.log(values)
          this.$message.success(values[0])
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isPost) this.minetokenCreate()
          else this.minetokenEdit(this.tokenId)
        } else return false
      })
    },
    // 完成上传
    doneImageUpload(res) {
      // console.log(res)
      this.form.logo = res.data.data.cover
      this.imgUploadDone += Date.now()
    },
    removeCoinsIcon() {
      this.form.logo = ''
    },
    aboutAdd() {
      if (this.about.length >= 5) return
      this.about.push('')
    },
    abountLess(i) {
      if (this.about.length <= 1) return
      this.about.splice(i, 1)
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
        if (Number(value) > 0) {
          this.form.number = Number(value)
          this.minetokenMint()
        }
      }).catch(() => {
        // 不写这个取消时候会报错
      })
    }
  }
}
</script>

<style lang="less" scoped>
.coins-head {
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: rgba(0, 0, 0, 1);
    line-height: 33px;
    padding: 0;
    margin: 0;
  }
  .help-icon {
    color: rgba(219, 219, 219, 1);
    margin-left: 10px;
    margin-right: 10px;
  }
  .help-link {
    font-size: 14px;
    color: #868686;
    line-height: 20px;
    text-decoration: underline;
    margin-left: 10px;
  }

  .click-box {
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }
}
.coina-cover {
  width: 90px;
  height: 90px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-sizing: border-box;
  background: #ececec;
  border: 1px solid #ececec;
  &:hover .cover-full {
    display: flex;
  }
  .cover-full {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    // display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none;
    .remove {
      font-size: 26px;
      color: #fff;
    }
  }
}
.coins-upload-content {
  width: 90px;
  height: 90px;
  overflow: hidden;
}
.coins-upload {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .add {
    font-size: 26px;
    color: #8c939d;
  }
}
.input-form {
  margin-top: 30px;
  .input {
    max-width: 400px;
  }
  .social-input {
    max-width: 340px;
  }
}
.publish-btn {
  display: block;
}

.tokens-image {
  width: 100%;
  height: 100%;
}
.about-input {
  margin: 0 0 10px;
  width: 100%;
}
.about-input-btn {
  width: 24px;
  height: 24px;
  background-color: @purpleDark;
  color: @white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 0 0 0 10px;
  cursor: pointer;
  &.add {
    margin-left: 0;
  }
}
.social-item {
  display: inline-block;
  width: 100%;
}
.social-title {
  padding: 0;
  margin: 12px 0 10px 60px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
  span {
    span {
      color: red;
    }
  }
}
.social-icons {
  width: 60px;
}
.tag-title {
  font-weight: bold;
  font-size: 20px;
  margin: 0;
}
.tips {
  padding: 0;
  margin: 10px 0 0 0;
  line-height: 1.5;
  color: #848484;
  font-size: 14px;
}

@media screen and (max-width: 640px) {
  .coins-head {
    display: block;
  }
  .coins-head .click-box {
    margin-right: 0;
    margin-top: 10px;
    text-align: left;
    flex: none;
  }
  .coins-head .help-link {
    margin-top: 10px;
    margin-left: 0;
  }

  .input-form {
    /deep/ .el-form-item__label {
      display: block;
      text-align: left;
      float: left;
    }
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
    /deep/ .el-checkbox {
      width: 100%;
      overflow: hidden;
    }
    /deep/ .el-checkbox__label {
      white-space: initial;
    }
  }
  .publish-btn {
    min-width: 200px;
    text-align: center;
    margin: 0 auto;
  }
}
</style>

<style>
.social-title span span {
  color: red;
}
</style>
