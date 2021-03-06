<template>
  <div class="ipfs">
    <el-popover
      placement="top"
      trigger="hover"
      class="components-ipfs_all"
      popper-class="ipfs-popover"
    >
      <div class="components-ipfs_all">
        <!--文章保存位置-->
        <div v-if="isPublishedOnGithub">
          <p class="ipfs_all__title">
            <a
              class="github-history-link"
              :href="githubBlogLink"
            >{{ $t('githubHash.link') }}</a>
            <span style="float: right;">
              <a
                class="github-history-link"
                :href="githubHistoryLink"
              >{{ $t('ipfsHash.historyBtn') }}</a>
            </span>
          </p>
          <p class="ipfs_all__title">
            <a
              class="github-history-link"
              :href="githubBlogArticleLink"
            >
              {{ $t('githubHash.indieArticle') }}
              <i class="el-icon-position" />
            </a>
          </p>
        </div>
        <p v-else class="ipfs_all__title">
          {{ $t("ipfsHash.link") }}
          <el-button
            type="text"
            style="float: right;"
            @click="dialogVisible = true"
          >
            {{ $t('ipfsHash.historyBtn') }}
          </el-button>
        </p>

        <!--文章Hash-->
        <div v-show="hash" class="ipfs_all__address">
          <p>{{ isPublishedOnGithub ? 'File Hash: ' + hash : 'IPFS Hash: ' + hash }}</p>
          <svg-icon icon-class="copy" class="icon" @click="copy(hash)" />
        </div>
        <p v-show="!hash" class="ipfs_all__not">
          {{ $t("not") }}
        </p>

        <!--文章保存位置：标题-->
        <p v-if="isPublishedOnGithub" class="ipfs_all__title">
          {{ $t("githubHash.filePath") }}
        </p>
        <p v-else class="ipfs_all__title">
          {{ $t("ipfsHash.publicNode") }}
        </p>

        <!--文章保存位置：详细地址-->
        <template v-if="hash">
          <template v-if="isPublishedOnGithub">
            <div
              class="ipfs_all__link"
            >
              <a :href="githubLink" target="_blank"> {{ githubLink }} </a>
              <svg-icon icon-class="arrow" class="icon" />
            </div>
          </template>
          <template v-else>
            <div
              v-for="(item, index) in link"
              :key="index"
              class="ipfs_all__link"
            >
              <a :href="item + hash" target="_blank"> {{ item }}{{ hash }} </a>
              <svg-icon icon-class="arrow" class="icon" />
            </div>
          </template>
        </template>
        <p v-show="!hash" class="ipfs_all__not">
          {{ $t("not") }}
        </p>

        <p class="ipfs_all__description">
          {{ isPublishedOnGithub ? $t('githubHash.description') : $t('ipfsHash.slogan') }}
        </p>
      </div>
      <div slot="reference" class="ipfs_box">
        <svg-icon icon-class="ipfs" class="ipfs_all__icon" />
      </div>
    </el-popover>
    <el-dialog
      :title="historyDialogTitle"
      :visible.sync="dialogVisible"
      class="history-dialog"
    >
      <ArticleHistory :article-ipfs-array="articleIpfsArray" />
    </el-dialog>
  </div>
</template>

<script>
import ArticleHistory from './history'
export default {
  components: {
    ArticleHistory
  },
  props: {
    articleIpfsArray: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    githubId: {
      type: String,
      required: false,
      default: ''
    },
    githubRepo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      link: [
        'https://ipfs.io/ipfs/',
        'https://ipfs.infura.io/ipfs/'
      ],
    }
  },
  computed: {
    hash() {
      return this.articleIpfsArray.length !== 0
        ? this.articleIpfsArray[0].htmlHash
        : ''
    },
    historyDialogTitle() {
      return this.$t('ipfsHash.history.title')
    },
    isPublishedOnGithub() {
      return this.hash.startsWith('Gh')
    },
    githubLink() {
      const year = this.hash.substring(2, 6)
      const date = this.hash.substring(6, 8)
      return `https://github.com/${this.githubId}/${this.githubRepo}/blob/source/source/_posts/${year}/${date}/${this.hash}.md`
    },
    githubHistoryLink() {
      const year = this.hash.substring(2, 6)
      const date = this.hash.substring(6, 8)
      return `https://github.com/${this.githubId}/${this.githubRepo}/commits/source/source/_posts/${year}/${date}/${this.hash}.md`
    },
    githubBlogLink() {
      return this.user.siteLink
    },
    githubBlogArticleLink() {
      const year = this.hash.substring(2, 6)
      const date = this.hash.substring(6, 8)
      return `${this.user.siteLink}${year}/${date}/${this.hash}`
    },
  },
  methods: {
    copy(val) {
      this.$copyText(val).then(
        () => this.$message({
          showClose: true,
          message: this.$t('success.copy'),
          type: 'success'
        }),
        () => this.$message({ showClose: true, message: this.$t('error.copy'), type: 'error' })
      )
    }
  }
}
</script>

<style lang="less" scoped>
.components-ipfs_all {
  .ipfs_box {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .ipfs_all__icon {
    font-size: 20px;
  }
  .ipfs_all__title {
    padding: 0;
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
  }
  .ipfs_all__address {
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    p {
      padding: 0;
      margin: 0;
      font-size: 12px;
      color: @purpleDark;
      line-height: 17px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .icon {
      margin: 0 0 0 4px;
    }
  }

  .ipfs_all__link {
    display: flex;
    align-items: center;
    margin: 0 0 10px 0;
    a {
      padding: 0;
      margin: 0;
      display: block;
      font-size: 12px;
      color: #b2b2b2;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &:hover {
        color: #a09f9f;
      }
    }
    .icon {
      color: @purpleDark;
      margin-left: 4px;
      font-size: 12px;
    }
  }

  .ipfs_all__description {
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: rgba(178, 178, 178, 1);
    line-height: 17px;
  }
  .ipfs_all__not {
    margin: 0 0 10px;
    font-size: 14px;
    color: rgba(178, 178, 178, 1);
    line-height: 17px;
  }
}
// .ipfs-tip {
//   font-size:12px;
//   font-weight:400;
//   color:rgba(178,178,178,1);
//   line-height:14px;
//   margin-bottom: 10px;
// }

// .ipfs-link {
//   font-size:12px;
//   font-weight: bold;
//   color: @purpleDark;
//   line-height:14px;
// }

.history-dialog {
  /deep/ .el-dialog {
    width: 60%;
  }
}

a:visited {
  color: @purpleDark;
}


@media screen and (max-width: 992px) {
  .history-dialog {
    /deep/ .el-dialog {
      width: 80%;
    }
  }
}
@media screen and (max-width: 560px) {
  .history-dialog {
    /deep/ .el-dialog {
      width: 90%;
    }
  }
}


</style>

<style lang="less">
.github-history-link {
  color: @purpleDark;
  &:visited {
    color: @purpleDark;
  }
}
.ipfs-popover {
  width: 370px;
}
@media screen and (max-width: 410px) {
  .ipfs-popover {
    width: 90%;
  }
}
</style>
