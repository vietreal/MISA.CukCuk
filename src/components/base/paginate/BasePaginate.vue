<template>
  <div
    :class="containerClass"
    v-if="!noLiSurround"
    style="display: flex; align-items: center"
  >
    <div
      v-if="firstLastButton"
      :class="[pageClass, firstPageSelected() ? disabledClass : '']"
      class="btn-paginate"
    >
      <div
        @click="selectFirstPage()"
        @keyup.enter="selectFirstPage()"
        :class="firstLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        v-html="firstButtonText"
      ></div>
    </div>

    <div
      v-if="!(firstPageSelected() && hidePrevNext)"
      :class="[prevClass, firstPageSelected() ? disabledClass : '']"
      class="btn-paginate"
    >
      <div
        @click="prevPage()"
        @keyup.enter="prevPage()"
        :class="prevLinkClass"
        :tabindex="firstPageSelected() ? -1 : 0"
        v-html="prevText"
      ></div>
    </div>

    <span class="separator"></span>

    <span style="padding: 0 4px; margin-right: 10px">Trang </span>

    <div
      v-for="(page, i) in pages"
      :key="i"
      :class="[
        pageClass,
        page.selected ? activeClass : 'hide',
        page.disabled ? disabledClass : '',
        page.breakView ? breakViewClass : '',
      ]"
    >
      <!-- <div
        v-if="page.breakView"
        :class="[pageLinkClass, breakViewLinkClass]"
        tabindex="0"
        style="display: none"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </div>

      <div
        v-else-if="page.disabled"
        :class="pageLinkClass"
        tabindex="0"
        style="display: none"
      >
        {{ page.content }}
      </div>

      <div
        v-else
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
        :class="pageLinkClass"
        tabindex="0"
        contenteditable
      >
        {{ page.content }}
      </div> -->

      <div v-if="page.selected">
        <input
          @keydown.enter="handlePageSelected($event.target.value)"
          :class="pageLinkClass"
          tabindex="0"
          :value="page.content"
        />
      </div>
    </div>

    <span style="padding: 0 4px; margin-left: 14px; margin-right: 10px">
      trên {{ pageCount }}
    </span>

    <span class="separator"></span>

    <div
      v-if="!(lastPageSelected() && hidePrevNext)"
      :class="[nextClass, lastPageSelected() ? disabledClass : '']"
      class="btn-paginate"
    >
      <div
        @click="nextPage()"
        @keyup.enter="nextPage()"
        :class="nextLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        v-html="nextText"
      ></div>
    </div>
    <div
      v-if="firstLastButton"
      :class="[pageClass, lastPageSelected() ? disabledClass : '']"
      class="btn-paginate"
    >
      <div
        @click="selectLastPage()"
        @keyup.enter="selectLastPage()"
        :class="lastLinkClass"
        :tabindex="lastPageSelected() ? -1 : 0"
        v-html="lastButtonText"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    forcePage: {
      type: Number,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
    pageRange: {
      type: Number,
      default: 3,
    },
    marginPages: {
      type: Number,
      default: 1,
    },
    prevText: {
      type: String,
      default: "Prev",
    },
    nextText: {
      type: String,
      default: "Next",
    },
    breakViewText: {
      type: String,
      default: "…",
    },
    containerClass: {
      type: String,
    },
    pageClass: {
      type: String,
    },
    pageLinkClass: {
      type: String,
    },
    firstLinkClass: {
      type: String,
    },
    hidePrevClass: {
      type: String,
    },
    hideNextClass: {
      type: String,
    },
    prevClass: {
      type: String,
    },
    prevLinkClass: {
      type: String,
    },
    nextClass: {
      type: String,
    },
    nextLinkClass: {
      type: String,
    },
    lastLinkClass: {
      type: String,
    },
    breakViewClass: {
      type: String,
    },
    breakViewLinkClass: {
      type: String,
    },
    activeClass: {
      type: String,
      default: "active",
    },
    disabledClass: {
      type: String,
      default: "disabled",
    },
    noLiSurround: {
      type: Boolean,
      default: false,
    },
    firstLastButton: {
      type: Boolean,
      default: false,
    },
    firstButtonText: {
      type: String,
      default: "First",
    },
    lastButtonText: {
      type: String,
      default: "Last",
    },
    hidePrevNext: {
      type: Boolean,
      default: false,
    },
  },
  beforeUpdate() {
    if (this.forcePage === undefined) return;
    if (this.forcePage !== this.selected) {
      this.selected = this.forcePage;
    }
  },
  computed: {
    selected: {
      get: function () {
        return this.value || this.innerValue;
      },
      set: function (newValue) {
        this.innerValue = newValue;
      },
    },
    pages: function () {
      let items = {};
      if (this.pageCount <= this.pageRange) {
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };
          items[index] = page;
        }
      } else {
        const halfPageRange = Math.floor(this.pageRange / 2);

        let setPageItem = (index) => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === this.selected - 1,
          };

          items[index] = page;
        };

        let setBreakView = (index) => {
          let breakView = {
            disabled: true,
            breakView: true,
          };

          items[index] = breakView;
        };

        // 1st - loop thru low end of margin pages
        for (let i = 0; i < this.marginPages; i++) {
          setPageItem(i);
        }

        // 2nd - loop thru selected range
        let selectedRangeLow = 0;
        if (this.selected - halfPageRange > 0) {
          selectedRangeLow = this.selected - 1 - halfPageRange;
        }

        let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
        if (selectedRangeHigh >= this.pageCount) {
          selectedRangeHigh = this.pageCount - 1;
          selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
        }

        // debugger; // eslint-disable-line no-debugger
        for (
          let i = selectedRangeLow;
          i <= selectedRangeHigh && i <= this.pageCount - 1;
          i++
        ) {
          setPageItem(i);
        }

        // Check if there is breakView in the left of selected range
        if (selectedRangeLow > this.marginPages) {
          setBreakView(selectedRangeLow - 1);
        }

        // Check if there is breakView in the right of selected range
        if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
          setBreakView(selectedRangeHigh + 1);
        }

        // 3rd - loop thru high end of margin pages
        for (
          let i = this.pageCount - 1;
          i >= this.pageCount - this.marginPages;
          i--
        ) {
          setPageItem(i);
        }
      }
      return items;
    },
  },
  data() {
    return {
      innerValue: 1,
    };
  },
  methods: {
    handlePageSelected(selected) {
      if (selected > this.pageCount) selected = this.pageCount;
      if (selected < 1) selected = 1;
      if (this.selected === selected) return;
      this.innerValue = selected;
      this.$emit("input", selected);
      this.clickHandler(selected);
    },
    prevPage() {
      if (this.selected <= 1) return;

      this.handlePageSelected(this.selected - 1);
    },
    nextPage() {
      if (this.selected >= this.pageCount) return;

      this.handlePageSelected(this.selected + 1);
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return this.selected === this.pageCount || this.pageCount === 0;
    },
    selectFirstPage() {
      if (this.selected <= 1) return;

      this.handlePageSelected(1);
    },
    selectLastPage() {
      if (this.selected >= this.pageCount) return;

      this.handlePageSelected(this.pageCount);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
