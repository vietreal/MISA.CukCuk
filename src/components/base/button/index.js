export default {
  name: "BaseButton",
  props: {
    icon: {
      type: String,
    },
    clickHandler: {
      type: Function,
      default: () => {},
    },
  },
};
