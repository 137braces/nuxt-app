<template>
 
    
  <div style="max-width: 800px;">
   
    <v-text-field label="コメント" placeholder="ここにコメントを書きましょう"
      outlined
      class="mx-auto"
      append-icon="mdi-check-bold"
      style="max-width: 100%; box-sizing: border-box;"
      v-model="form.content"
      @keydown="onEnter"
      @click:append="createPost"
    ></v-text-field>
    

<v-card v-for="(item, index) in items" :key="index" elevation="10" tile>
  <v-list-item three-line>
    <v-list-item-title>{{ item.content }}</v-list-item-title>
    <v-list-item-subtitle>by: {{ item.owner }}</v-list-item-subtitle>
  </v-list-item> 
</v-card>


  </div>
</template>

<script>
import { API } from 'aws-amplify' // Amplifyライブラリを読み込み
import { createPost } from '~/src/graphql/mutations' // GraphQL Mutation（データをエンドポイントに送信する構文?）
import { listPosts } from '~/src/graphql/queries' // GraphQL Query（データを読み込む構文？）

// import { onCreatePost } from '~/src/graphql/subscriptions'

export default {
  data() {
    return {
      form: {
        content: '',
      },
      items: [],
    }
  },
  created() {
    this.getPostList() 
  },
  methods: {
    async createPost() {
      // コメントを送信する
      const content = this.form.content // コメント入力値を取得
        if (!content) {
           alert("文字を入力して下さい") 
           return // 空のときは処理しない
        }
        else if(content.length >= 12) {
           alert("文字数が多いです")
           return 
        }
        const post = { content } // 送信用のJSONを作成

        // 送信処理
        await API.graphql({
          query: createPost, // GraphQL Mutation
          variables: { input: post }, // 送信データ
        })

      this.form.content = '' // 送信後にテキストフィールドを空に。
    },

    onEnter(event) {
      if (event.keyCode !== 13) return
      this.createPost()
    },
    async getPostList() {  
    // コメント一覧を取得
      const postList = await API.graphql({
        query: listPosts, // GraphQL Query
      })
      this.items = postList.data.listPosts.items // 読み込みしたデータを一覧に表示
    },
  
  }
}
</script>