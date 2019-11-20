<template>
  <div class="video-box" :style="{height,width}">
    <div v-if="isShowMask" class="not-started-mask">
      <img class="poster" :src="poster" alt />
      <div class="error-refresh-box">
        <div class="error-refresh-wrp">
          <p>{{isPlayError?"加载失败，请稍后重试！":"视频转码中，请稍后观看..."}}</p>
          <span class="refresh-btn" v-if="isPlayError" @click="play">刷新</span>
        </div>
      </div>
    </div>
    <div v-else class="dplayer-box" id="dplayer"></div>
  </div>
</template>
<script>
const Hls = require("hls.js");
import "dplayer/dist/DPlayer.min.css";
import DPlayer from "dplayer";
export default {
  name: "xgplayer",
  props: {
    width: {
      type: String,
      default: "640px"
    },
    height: {
      type: String,
      default: "360px"
    },
    hlsUrl: {
      type: String,
      default: ""
    },
    playbackUrl: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isLive: {
      type: Boolean,
      default: false
    },
    poster: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      player: null,
      isPlayError: false,
      videoUrlIndex: 0,
      duration: ""
    };
  },
  computed: {
    videoUrl() {
      return this.playbackUrl[this.videoUrlIndex];
    },
    isShowMask() {
      let isTranscoding = this.playbackUrl.length == 0 && this.hlsUrl == "";
      return this.isPlayError || isTranscoding;
    },
    liveOptions() {
      return {
        video: {
          url: this.hlsUrl,
          pic: this.poster,
          type: "customHls",
          customType: {
            customHls: function(video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            }
          }
        }
      };
    },
    playbackOption() {
      return {
        video: {
          url: this.videoUrl,
          pic: this.poster,
          type: "auto"
        }
      };
    },
    playerOptions() {
      let baseOption = {
        container: document.getElementById("dplayer"),
        live: this.isLive,
      };
      let option = this.isLive ? this.liveOptions : this.playbackOption;
      return { ...baseOption, ...option };
    }
  },
  mounted() {
    console.log("视频初始化");
    this.handleInitVideo();
  },
  methods: {
    handleInitVideo() {
      this.player = new DPlayer(this.playerOptions);
      this.player.on("error", () => {
        console.log("error");
        this.isPlayError = true;
      });
      this.player.on("ended", () => {
        this.handleEnded();
      });
      // this.player.on("emptied", () => {
      //   console.log("emptied");
      //   // this.isPlayError = true;
      // });
      // this.player.on("waiting", () => {
      //   console.log("waiting");
      // });
      // this.player.on("loadeddata", () => {
      //   console.log("loadeddata");
      // });
      // this.player.on("loadedmetadata", () => {
      //   console.log("loadedmetadata");
      // });
      // this.player.on("loadstart", () => {
      //   console.log("loadstart");
      // });
      // this.player.on("mozaudioavailable", () => {
      //   console.log("mozaudioavailable");
      // });
      // this.player.on("timeupdate", () => {
      //   console.log("timeupdate");
      // });
      // this.player.on("suspend", () => {
      //   console.log("suspend");
      // });
      // this.player.on("canplaythrough", () => {
      //   console.log("canplaythrough");
      // });
      // this.player.on("seeking", () => {
      //   console.log("seeking");
      // });
      // this.player.on("seeked", () => {
      //   console.log("seeked");
      // });
      // this.player.on("ratechange", () => {
      //   console.log("ratechange");
      // });
      // this.player.on("mozaudioavailable", () => {
      //   console.log("mozaudioavailable");
      // });
      // this.player.on("abort", () => {
      //   console.log("abort");
      // });
    },
    play() {
      this.isPlayError = false;
      this.handleInitVideo();
      this.player.play();
    },
    handleEnded() {
      this.videoUrlIndex++;
      console.log(this.videoUrlIndex);
      if (this.videoUrlIndex < this.playbackUrl.length) {
        this.handleInitVideo();
        this.play();
      }
    }
  },
  destroyed() {
    this.player.destroy();
  }
};
</script>
<style lang="less">
.not-started-mask {
  position: relative;
  width: 640px;
  height: 360px;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
  .poster {
    width: 100%;
    position: absolute;
    top: 0;
  }
  .error-refresh-box {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    top: 0;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    background: rgba(0, 0, 0, 0.4);
    .error-refresh-wrp {
      p {
        // font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
      }
      .refresh-btn {
        width: 68px;
        line-height: 24px;
        height: 24px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(236, 236, 236, 1);
        // opacity: 0.3;
        border-radius: 20px;
        text-align: center;
        display: block;
        font-size: 12px;
        cursor: pointer;
        margin: 10px auto;
      }
    }
  }
}
.video-box {
  position: relative;
}
.dplayer-box{
  width: 100%;
  height: 100%;
}
</style>

