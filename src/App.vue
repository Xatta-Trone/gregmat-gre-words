<template>
  <div class="theme" id="theme">
    <div
      class="w-full flex flex-row items-center p-2 justify-between shadow-xs bg-indigo-500 mx-auto"
    >
      <div class="ml-8 text-lg text-white hidden md:flex">GregMat GRE</div>
      <div
        class="text-lg text-white hidden md:flex mr-8 cursor-pointer"
        @click="changeTheme()"
      >
        {{ currentMode == true ? "Dark mode" : "Light mode" }}
      </div>
    </div>

    <div class="flex items-center justify-center self-center mx-auto mt-3">
      <div class="inline-block mr-2 mt-1">
        <button
          type="button"
          class="focus:outline-none text-white text-sm py-2.5 px-5 bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg"
          @click="randomWord"
        >
          Random Word
        </button>
      </div>
      <!-- random word -->
      <!-- filter -->

      <div class="inline-block mr-2 mt-2">Study set</div>
      <div class="inline-block mr-2 mt-2">
        <select
          v-model="lower_selected"
          class="border border-gray-300 rounded-sm text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
          @change="lowerChange"
        >
          <option v-for="sform in lower" :key="sform.id" :value="sform.id">
            {{ sform.value }}
          </option>
        </select>
      </div>

      <!-- select box -->
      <!-- next prev word -->
      <div class="inline-block mt-2">
        <button
          class="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white border border-indigo-500 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
          @click="prevWord"
        >
          Prev. Word
        </button>
        <button
          @click="nextWord"
          class="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white border border-l-0 border-indigo-500 rounded-r-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
        >
          Next Word
        </button>
      </div>
      <!-- next prev word -->

      <!-- search box -->
      <div class="inline-block mx-2 mt-2">
        <input
          class="w-full h-11 px-4 rounded-lg mb-0 focus:outline-none focus:shadow-outline text-base shadow-md border border-indigo-300 text-black-700 searchfield"
          type="search"
          placeholder="Search words..."
          v-model="searchquery"
          @keyup.prevent="filterwords"
          @input="filterwords"
          list="browsers"
        />
        <datalist
          id="browsers"
          class="px-3 py-2 cursor-pointer hover:bg-gray-200"
        >
          <option
            class="px-3 py-2 cursor-pointer hover:bg-gray-200"
            :value="word.word"
            v-for="word in currentWords"
            :key="word.word + word.id"
          ></option>
        </datalist>
      </div>
      <!-- search box -->
    </div>

    <!-- current word -->
    <div
      class="flex items-center justify-center self-center mx-auto"
      v-if="current_word"
    >
      <h2 class="text-3xl capitalize text-center py-3">
        {{ current_word.word }}
        <small class="text-xs text-gray-600">
          <span
            ><img
              style="display: inline-block; cursor: pointer"
              :src="imgUrl"
              alt="asdf"
              @click="speak"
          /></span>
          (set/word no - {{ current_word.set }}/{{
            current_word.wordNo
          }})</small
        >
      </h2>
    </div>

    <div class="container mx-auto px-6">
      <div class="grid gap-1 grid-flow-col auto-cols">
        <div class="words-meanings col-auto">
          <!-- current word meanings -->
          <div class="container mx-auto">
            <div class="mx-auto flex justify-center">
              <div>
                <div
                  v-for="(definitons, i) in current_word.definitions"
                  :key="current_word + i"
                  class="my-1"
                >
                  <div
                    class="p-0 my-1"
                    v-for="(singledefinition, k) in definitons.definitions"
                    :key="singledefinition + k"
                  >
                    <div
                      class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full p-2 shadow text-teal text-sm"
                    >
                      <span
                        class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                      >
                        {{ definitons.partOfSpeech }}
                      </span>
                      <span class="inline-flex px-2 text-black max-w-prose">{{
                        singledefinition
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- synonyms -->
                <div class="py-1 inline-block" v-show="current_word.synonyms">
                  <div
                    class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full my-1 shadow text-teal text-sm"
                  >
                    <span
                      class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                      >Synonyms</span
                    >
                  </div>

                  <div class="my-1 flex flex-wrap -m-1 max-w-2xl">
                    <span
                      v-for="(synoyme, i) in current_word.synonyms"
                      :key="synoyme + i"
                      class="m-1 bg-gray-200 hover:bg-gray-200 rounded-full px-2 font-normal text-base leading-loose text-black"
                      >{{ synoyme }}</span
                    >
                  </div>
                </div>
                <!-- synonyms -->

                <!-- example -->
                <div
                  class="py-0"
                  v-for="(example, m) in current_word.example"
                  :key="example + m"
                >
                  <div
                    class="inline-flex items-center mt-1 bg-white leading-none text-black-600 rounded-full p-2 shadow text-teal text-sm"
                  >
                    <span
                      class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                      >Example</span
                    >
                    <span class="inline-flex px-2 max-w-prose text-black">{{
                      example
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- img -->
        <div class="" v-if="current_word.images && current_word.images.length > 0">
          <!-- images -->
          <div class="py-1">
            <div>
              <div class="flex flex-row flex-wrap">
                <img
                  :src="img.src"
                  :alt="img.alt"
                  :key="img.src"
                  v-for="img in current_word.images"
                  width="auto"
                />
              </div>
              <em
                >Image example from
                <a
                  class="underline"
                  :href="`https://wordinfo.info/results?searchString=${current_word.word}`"
                  target="_blank"
                  >wordinfo.info</a
                >
              </em>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- example -->

    <!-- current word meanings -->
    <!-- footer  -->

    <div class="pt-2">
      <div
        class="flex justify-between items-start pb-5 m-auto border-t border-gray-500 text-gray-400 text-sm flex-col md:flex-row max-w-6xl"
      >
        <div class="mt-2">
          Made by
          <a href="https://github.com/Xatta-Trone/" target="_blank"
            >Xatta Trone</a
          >
          <a
            class="inline-block mx-2"
            href="https://github.com/Xatta-Trone"
            target="_blank"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-github"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
              ></path>
            </svg>
          </a>
          <a
            class="inline-block"
            href="https://www.linkedin.com/in/monzurul-islam/"
            target="_blank"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-linkedin"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
              ></path>
              <path d="M8 11l0 5"></path>
              <path d="M8 8l0 .01"></path>
              <path d="M12 16l0 -5"></path>
              <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
            </svg>
          </a>
        </div>
        <div class="mt-2 text-black dark:text-white ">
          <a
            href="https://gre-sentence-equivalence.com/"
            target="_blank"
            class="font-medium text-blue-600 mt-2 dark:text-blue-500 hover:underline text-lg font-bold"
            >Visit this better website on GRE vocabulary https://gre-sentence-equivalence.com/</a
          >
        </div>
        <div class="mt-2">
          <a
            href="https://docs.google.com/spreadsheets/d/1jRATLVV34vATsL4Y67fZZXQc7qZPYc0c0Yk7Bykh4fw/edit#gid=0"
            target="_blank"
            >Original vocabulary list</a
          >
        </div>
      </div>
    </div>
    <notifications group="foo" position="bottom right" />
  </div>
</template>

<script>
const wordskey = "wordsv4a";
const timekey = "wordsexpiery2";
const themekey = "gretheme";
import axios from "axios";
export default {
  data: function () {
    return {
      words: [],
      currentMode: true,
      currentWords: null,
      currentWordsMaxid: null,
      currentWordsMinid: null,
      lower: [
        { id: 0, value: "all words" },
        { id: 1, value: "set 1 " },
        { id: 2, value: "set 2 " },
        { id: 3, value: "set 3 " },
        { id: 4, value: "set 4 " },
        { id: 5, value: "set 5 " },
        { id: 6, value: "set 6 " },
        { id: 7, value: "set 7 " },
        { id: 8, value: "set 8 " },
        { id: 9, value: "set 9 " },
        { id: 10, value: "set 10 " },
        { id: 11, value: "set 11 " },
        { id: 12, value: "set 12 " },
        { id: 13, value: "set 13 " },
        { id: 14, value: "set 14 " },
        { id: 15, value: "set 15 " },
        { id: 16, value: "set 16 " },
        { id: 17, value: "set 17 " },
        { id: 18, value: "set 18 " },
        { id: 19, value: "set 19 " },
        { id: 20, value: "set 20 " },
        { id: 21, value: "set 21 " },
        { id: 22, value: "set 22 " },
        { id: 23, value: "set 23 " },
        { id: 24, value: "set 24 " },
        { id: 25, value: "set 25 " },
        { id: 26, value: "set 26 " },
        { id: 27, value: "set 27 " },
        { id: 28, value: "set 28 " },
        { id: 29, value: "set 29 " },
        { id: 30, value: "set 30 " },
        { id: 31, value: "set 31 " },
        { id: 32, value: "set 32 " },
        { id: 33, value: "set 33 " },
        { id: 34, value: "set 34 " },
        { id: 35, value: "set 35 " },
        { id: 36, value: "set 36 " },
        { id: 37, value: "set 37 " }
      ],

      lower_selected: 0,
      current_word: null,
      searchquery: "",
      awaitingSearch: false,
      aaa: null,
      speaking: false,
    };
  },
  computed: {
    imgUrl: function () {
      return this.speaking
        ? require("./assets/volume-2.svg")
        : require("./assets/volume.svg");
    },
  },
  mounted() {
    this.getTheme();
    this.getWords();
    this.sortWords();
  },
  methods: {
    speak() {
      this.speaking = true;
      if ("speechSynthesis" in window) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = this.current_word.word;
        window.speechSynthesis.speak(msg);
      } else {
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
      }
      this.speaking = false;
    },
    getTheme() {
      if (localStorage.getItem(themekey)) {
        console.log(JSON.parse(localStorage.getItem(themekey)));
        this.currentMode = !JSON.parse(localStorage.getItem(themekey));

        this.changeTheme();
      }
    },
    getWords() {
      console.log("words");

      if (localStorage.getItem(wordskey)) {
        //check time
        console.log("words found");
        const itemStr = localStorage.getItem(timekey);
        // if the item doesn't exist, return null
        if (!itemStr) {
          console.log("ttl not  found");
          return this.getaxiosWord();
        }
        //check time
        const item = JSON.parse(itemStr);
        const now = new Date();
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
          // If the item is expired, delete the item from storage
          console.log("words expired");
          localStorage.removeItem(timekey);
          localStorage.removeItem(wordskey);
          return this.getaxiosWord();
        }

        console.log("words found");
        this.setWords();
      } else {
        return this.getaxiosWord();
      }
    },
    setWords() {
      this.words = JSON.parse(localStorage.getItem(wordskey));
      this.currentWords = this.words;
      this.randomWord();
    },
    changeTheme() {
      // document.getElementById("theme").classList.toggle("theme-dark");
      if (this.currentMode) {
        document.body.style.backgroundColor = "#121212";
        document.body.style.color = "white";
      } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "black";
      }
      document.body.classList.toggle("dark");
      this.currentMode = !this.currentMode;
      localStorage.setItem(themekey, JSON.stringify(this.currentMode));
    },
    getaxiosWord() {
      let links = [
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_1_8.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_9_12.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_13_20.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_21_28.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_29_36.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_37_46.json",
        "https://raw.githubusercontent.com/Xatta-Trone/gregmatgrewordsdb/main/group_compact_47_52.json",
      ];
      return Promise.all(links.map(this.getWordsFromLink)).then((res) => {
        this.sortWords();
        const now = new Date();
        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        const item = {
          expiry: now.getTime() + 21 * 24 * 3600 * 60,
        };
        localStorage.setItem(timekey, JSON.stringify(item));
        localStorage.setItem(wordskey, JSON.stringify(this.words));
        this.setWords();

        if (res.indexOf(false) === -1) {
          localStorage.setItem(wordskey, JSON.stringify(this.words));
          this.$notify({
            group: "foo",
            text:
              "there was an error getting words, please press Ctrl+F5 to reload !",
            position: "bottom",
            type: "error",
          });
        }
      });
    },
    sortWords() {
      this.words.sort(function (a, b) {
        var x = a["id"];
        var y = b["id"];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },

    getWordsFromLink(link) {
      return axios
        .get(link)
        .then((res) => {
          console.log(res.data);

          let newWords = [...this.words, ...res.data];

          this.words = newWords;

          return true;
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            group: "foo",
            text:
              "there was an error getting words, please press Ctrl+F5 to reload !",
            position: "bottom",
            type: "error",
          });
          return false;
        });
    },

    randomWord: function () {
      this.searchquery = "";
      this.lower_selected = 0;
      this.current_word = this.words[
        Math.floor(Math.random() * this.words.length)
      ];
    },
    lowerChange() {
      console.log(this.lower_selected);

      if (this.lower_selected == 0) {
        this.currentWords = this.words;
        this.current_word = this.words[
          Math.floor(Math.random() * this.words.length)
        ];
        return;
      }

      let newset = this.words.filter((word) => {
        return word.set == this.lower_selected;
      });

      if (newset.length > 0) {
        newset.sort(function (a, b) {
          var x = a["id"];
          var y = b["id"];
          return x < y ? -1 : x > y ? 1 : 0;
        });
        this.currentWords = newset;

        // this.current_word = newset[0];
        this.current_word = newset[Math.floor(Math.random() * newset.length)];
      } else {
        this.$notify({
          group: "foo",
          text: "the set is not available!",
          position: "bottom",
          type: "error",
        });
      }

      console.log(newset);
    },

    prevWord() {
      // this.searchquery = "";
      // console.log(this.current_word.id);
      if (this.current_word.id - 1 >= this.currentWordsMinid) {
        this.current_word = this.words[this.current_word.id - 1];
      } else {
        // console.log("ok");
        this.$notify({
          group: "foo",
          text: "End of set / set is not available!",
          position: "bottom",
          type: "error",
        });
      }
    },
    nextWord() {
      console.log(this.current_word.id);
      // this.searchquery = "";
      if (this.current_word.id + 1 <= this.currentWordsMaxid) {
        this.current_word = this.words[this.current_word.id + 1];
      } else {
        this.$notify({
          group: "foo",
          text: "End of set!",
          position: "bottom",
          type: "error",
        });
      }
    },
    filterwords() {
      // console.log(this.searchquery);
      if (!this.awaitingSearch) {
        setTimeout(() => {
          console.log(this.searchquery);
          this.awaitingSearch = false;

          if (this.searchquery.length > 0) {
            let w = this.currentWords.filter((word) => {
              return (
                word.word
                  .toLowerCase()
                  .indexOf(this.searchquery.toLowerCase()) !== -1
              );
            });

            if (w.length === 0) {
              // alert("no word found!!! :(");
              this.$notify({
                group: "foo",
                text: "Could not found the word!",
                position: "bottom",
                type: "error",
              });
            } else {
              this.current_word = w[0];
            }
          }

          // this.currentWords.filter
        }, 400); //  delay
      }
      this.awaitingSearch = true;
    },
  },
  watch: {
    // whenever question changes, this function will run
    lower_selected: function (newval) {
      if (newval == 0) {
        this.currentWords = this.words;
      }
    },
    currentWords: function (newcurrentWords) {
      console.log("new", newcurrentWords);
      // this.currentWords.sort(function (a, b) {
      //   var x = a["id"];
      //   var y = b["id"];
      //   return x < y ? -1 : x > y ? 1 : 0;
      // });
      this.currentWordsMaxid = Math.max.apply(
        Math,
        newcurrentWords.map(function (o) {
          return o.id;
        })
      );
      this.currentWordsMinid = Math.min.apply(
        Math,
        newcurrentWords.map(function (o) {
          return o.id;
        })
      );
    },
  },
};
</script>

<style lang="css">
.searchfield {
  color: #121212;
}
</style>
