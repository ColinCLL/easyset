<template>
  <ParentLayout>
    <adsense slot="sidebar-bottom" />
    <!-- <AdSense slot="page-bottom" /> -->
  </ParentLayout>
</template>

<script>
import ParentLayout from "../../../node_modules/vuepress/lib/default-theme/Layout.vue";
import adsense from "./components/adsense.vue";
export default {
  components: {
    ParentLayout,
    adsense
  }
};
</script>