<template>
  <div class="loading"><div></div></div>
</template>

<style lang="scss" scoped>
/* Progress Bar https://codepen.io/holdencreative/pen/vEVbwv */
.loading {
  position: relative;
  height: 4px;
  display: block;
  width: 100%;
  background-color: #ccc;
  border-radius: 2px;
  background-clip: padding-box;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
}

.loading > div {
  background-color: #000;
}
.loading > div:before {
  content: "";
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
.loading > div:after {
  content: "";
  position: absolute;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
}

@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}
@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}
@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}

</style>
