<template>
  <footer :class="style.footer">
    <div :class="style.footerContent">
      <div :class="style.footerSection">
        <h3>联系我们</h3>
        <p>地址：广东省广州市番禺区大学城外环东路280号</p>
        <p>电话：020-12345678</p>
        <p>邮箱：library@gdpu.edu.cn</p>
      </div>
      <div :class="style.footerSection">
        <h3>开放时间</h3>
        <p>周一至周五：8:00 - 22:00</p>
        <p>周六至周日：9:00 - 21:00</p>
        <p>节假日：9:00 - 17:00</p>
      </div>
      <div :class="style.footerSection">
        <h3>快速链接</h3>
        <p><a href="#">学校主页</a></p>
        <p><a href="#">图书捐赠</a></p>
        <p><a href="#">常见问题</a></p>
      </div>
    </div>
    <div :class="style.copyright">
      <p>© 2023 广东药科大学图书馆 版权所有</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useCssModule } from 'vue';

const style = useCssModule();
</script>

<style lang="scss" module>
@use './app-footer.module.scss';
</style>