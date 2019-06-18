<template>
  <div class='tinymce'>
    <Editor v-model='tinymceHtml' :init='init'></Editor>
    
    <!-- <div style="display:block;"  v-html='tinymceHtml'></div> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
  import "../../public/tinymce/skins/ui/oxide/skin.css";
  import axios from 'axios'

  export default {
    name: 'tinymceEdit',
    data () {
      return {
        tinymceHtml: '',
        init: {
          language_url: '/tinymce/zh_CN.js',
          language: 'zh_CN',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false,
          images_upload_handler: function (blobInfo, success, failure) {
            let formdata = new FormData();
            formdata.set('upload_file', blobInfo.blob());
            // console.log(blobInfo.blob());

            this.$http.post('/XXXXXXXXXXXX',formdata)
            .then(res=>{
              success(res.data.data.src)
            })
            .catch(res=>{
              console.log(res.data)
            })
//            success('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3187738279,2985933781&fm=26&gp=0.jpg')
          }
        }
      }
    },
    mounted () {
      tinymce.init({})
    },
    components: {Editor}
  }
</script>

<style>
  .tinymce {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
