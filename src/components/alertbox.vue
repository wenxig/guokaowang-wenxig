<script setup lang="ts">
interface props {
  title: string
  text: string
  color?: string
  show?: boolean
}
const props = withDefaults(defineProps<props>(),{
  color:"#000",
  show:false
});
</script>

<template>
  <div class="alert_all" :class="{ show: show }">
    <p name="title">{{ title }}</p>
    <p name="text">{{ text }}</p>
  </div>
</template>

<style scoped lang="scss">
.alert_all {
  position: fixed;
  right: -500px;
  top: 10px;
  height: 80px;
  min-width: 260px;
  background-color: rgba(229, 229, 229, 0.7);
  border-radius: 10px;
  z-index: 200;
  transition: 500ms background, 500ms right;

  [name="title"] {
    font: {
      size: 20px;
      weight: 700;
    }

    margin: 10px;
  }

  [name="text"] {
    font: {
      size: 15px;
      weight: 500;
    }

    margin: 10px;
    margin-top: 0px;
  }

  p {
    margin: 0%;
  }

  &:hover {
    background-color: rgba(229, 229, 229, 1);
  }

  &.show {
    right: 10px !important;
  }
}</style>
