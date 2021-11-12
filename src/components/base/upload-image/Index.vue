<template>
  <div class="upload-image">
    <div class="image-file">
      <div class="body-wrap">
        <div class="image-body">
          <div
            class="image-display"
            @mouseover="isHoverImage = true"
            @mouseleave="isHoverImage = false"
            :class="{ image: imageType && !isHoverImage }"
          >
            <img
              src="../../../assets/images/ImageHandler.png"
              alt="Ảnh hàng hóa"
              :class="{ image: imageType }"
            />
            <div
              class="image-symbol flex flex-align-center"
              v-if="(!imageType || isHoverImage) && symbol"
            >
              <div class="misa-icon icon-pen"></div>
              <div class="text">Biểu tượng</div>
            </div>
          </div>
          <div class="image-footer flex" @mouseover="isHoverImage = true">
            <input
              type="file"
              hidden
              ref="uploadImage"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              @change="showImage"
            />
            <base-button
              type="primary"
              class="image-button-link"
              :click-handler="chooseImage"
              >...
            </base-button>
            <base-button
              type="secondary"
              class="image-button-cancel btn-hide"
              icon="icon-delete"
              :click-handler="removeImage"
            >
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <span class="image-text"
      >Chỉ được upload file
      <b>.jpg, .jpeg, .png, .gif</b>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { IMAGE_TYPE } from "../../../common/enums";
import { API_CONFIG } from "../../../common/api-config";
export default {
  data() {
    return {
      isHoverImage: false,
    };
  },

  props: {
    src: {
      type: String,
      default: "",
    },

    symbol: {
      type: Boolean,
      default: false,
    },
  },

  computed: mapGetters(["imageType"]),

  methods: {
    ...mapMutations(["SET_URL_IMAGE", "SET_IMAGE_TYPE"]),
    /**
     * Chọn ảnh
     */
    chooseImage() {
      this.$refs.uploadImage.click();
    },

    /**
     * Xóa ảnh
     */
    removeImage() {
      this.$refs.uploadImage.value = "";
      this.SET_IMAGE_TYPE(IMAGE_TYPE.ICON);
      this.SET_URL_IMAGE(API_CONFIG.DEFAULT_IMAGE_URL);
      this.$emit("changeFile", null);
    },

    /**
     * Hiển thị ảnh
     */
    showImage(event) {
      this.isHoverImage = false;
      let fileUpload = event.target.files[0];
      this.SET_IMAGE_TYPE(IMAGE_TYPE.IMAGE);
      this.SET_URL_IMAGE(URL.createObjectURL(fileUpload));
      this.$emit("changeFile", fileUpload);
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>