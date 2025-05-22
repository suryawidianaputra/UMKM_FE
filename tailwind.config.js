import tailwindcss from "@tailwindcss/vite";
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        "soft-xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
        "blue-glow": "0 4px 20px rgba(0, 123, 255, 0.4)",
        "card-sh": "0px 2px 12px rgba(0,0,0,9.8)",
      },
    },
  },
};
