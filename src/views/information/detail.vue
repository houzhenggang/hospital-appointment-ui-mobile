<template>
  <div class="information-detial">
    <div class="title">{{ title }}</div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import {
  getArticleById
} from '@/api/information/index'

export default {
  name: 'informationDetail',
  data () {
    return {
      data: {},
      loading: true
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    title () {
      return this.data.title
    },
    author () {
      return this.data.author
    },
    content () {
      return this.data.body
    }
  },
  methods: {
    getArticle () {
      this.loading = true
      getArticleById(this.id).then(({ data }) => {
        this.data = data.data
        this.loading = false
      })
    }
  },
  activated () {
    this.getArticle()
  },
  created () {
    this.getArticle()
  }
}
</script>

<style lang="scss">
.information-detial {
  > .title {
    padding: 10px 25px;
    text-align: center;
    font-weight: bold;
  }
  > .content {
    padding: 0px 10px 10px 10px;
    .avue-ueditor__img-img {
      max-width: calc(100vw - 20px);
    }
    blockquote {
      display: block;
      background: #fff;
      padding: 15px 20px 15px 30px;
      margin: 0 0 20px;
      position: relative;

      /*字体*/
      font-family: Georgia, serif;
      font-size: 16px;
      line-height: 1.2;
      color: #666;
      text-align: justify;

      /*边框 - (选项)*/
      border-left: 5px solid #c76c0c;
      border-right: 2px solid #c76c0c;
      background: #f5f5f5;
    }
    blockquote::before {
      content: "\201C"; /*左双引号的Unicode编码*/

      /*字体*/
      font-family: Georgia, serif;
      font-size: 30px;
      font-weight: bold;
      color: #999;

      /*位置*/
      position: absolute;
      left: 10px;
      top: 5px;
    }
    blockquote::after {
      content: ""; /*如果要显示右双引号，则写 content: "\201D"; */
    }
    .ql-syntax {
      background: #333333;
      color: #ffffff;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
</style>
