
<!--
  Beautifully text

  Test task for ByteCloud

  Author: Roman Ternovyi

  Link to frontend repo: https://github.com/rom4ukbro/bot_ts

  Link to backend repo: https://github.com/rom4ukbro/bot_ts_backend

  Link to  telegram bot: https://t.me/prpl_Roman

  Email: romeoyes777@gmail.com

-->
<template>
  <v-container>
    <h1>
      <a
        href="https://docs.google.com/document/d/116BbJ1lYHlXKmNT8ONRQDjll9jfssNxX8QmhVqysbzk/edit"
        target="_blank"
      >
        Test task
      </a>
      for ByteCloud
    </h1>
    <h2>Author: Roman Ternovyi</h2>

    <a href="https://github.com/rom4ukbro/test_bytecloud_front" target="_blank">
      Frontend repo
    </a>
    <br />
    <a href="https://github.com/rom4ukbro/test_bytecloud_back" target="_blank">
      Backend repo
    </a>
    <br />
    <a href="https://t.me/prpl_Roman" target="_blank">Telegram</a>
    <br />
    <p>Email: {{ email }} <v-btn small @click="copy(email)">Copy</v-btn></p>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  title: 'Test ByteCloud',
  data() {
    return {
      email: 'romeoyes777@gmail.com',
      subject: 'ByteCloud',
      body: 'Test ByteCloud',
    }
  },
  computed: {
    mailTo() {
      return `mailto:${this.email}?subject=${this.subject}&body=${this.body}`
    },
  },
  methods: {
    async copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied');
    } catch ($e) {
      console.log($e);
      alert('Cannot copy');
    }
  }
  }
}
</script>

