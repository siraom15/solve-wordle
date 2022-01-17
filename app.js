import { wordList } from "./wordList.js";

let app = new Vue({
  el: "#app",
  data: {
    letters: [],
    contain: "",
    notContain: "",
    results: [],
  },
  methods: {
    generateRegEx() {
      let array = new Array(5).fill(".");
      this.letters.forEach((e, index) => {
        array[index] = e.toLowerCase();
      });
      return `^${array.join("")}$`;
    },
    find() {
      const regex = new RegExp(this.generateRegEx());

      let result = wordList.filter((word) => word.match(regex));

      let contain = this.contain
        .split("")
        .map((e) => e.trim())
        .map((e) => e.toLowerCase())
        .filter((e) => e != "");
      let notContain = this.notContain
        .split("")
        .map((e) => e.trim())
        .map((e) => e.toLowerCase())
        .filter((e) => e != "");

      if (contain.length > 0) {
        console.log("Find Contain");
        result = result.filter((e) => {
          let bool = [];
          let temp = e.split("");
          contain.forEach((e) => {
            bool.push(temp.includes(e));
          });
          return bool.every(Boolean);
        });
      }
      if (notContain.length > 0) {
        console.log("Find Not Contain");
        result = result.filter((e) => {
            let bool = [];
            let temp = e.split("");
            notContain.forEach((e) => {
              bool.push(!temp.includes(e));
            });
            return bool.every(Boolean);
          });
      }

      this.results = result;
    },
  },
});
