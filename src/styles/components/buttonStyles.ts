export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    outline: "none",
    _focus: { boxShadow: "none" },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: (props) => ({
      bg: "#eb403a",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#fff",
      _hover: {
        bg: "#d63629",
        boxShadow: "md",
        color: "#fff",
        _disabled: {
          bg: "#eb403a",
          color: "black",
        },
      },
    }),
    secondary: () => ({
      bg: "#EEEEEE",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#333333",
      _hover: {
        bg: "#E5EBF5",
        boxShadow: "md",
        outline: "none",
      },
    }),
    secondaryOutline: () => ({
      bg: "transparent",
      border: "1px solid #333333",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#333333",
      transition: "all 200ms ease",
      _hover: {
        bg: "#F5F5F5",
        boxShadow: "md",
        transform: "scale(1.02)",
      },
      _focus: {
        outline: "none",
      },
    }),
    logout: () => ({
      bg: "#FF4136",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      color: "#fff",
      _hover: {
        bg: "#E33629",
        boxShadow: "md",
        color: "#fff",
        _disabled: {
          bg: "#FF4136",
          color: "black",
        },
      },
    }),
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: "primary",
  },
};
