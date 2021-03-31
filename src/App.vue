<template>
  <div>
    <div
      class="w-full flex flex-row items-center p-2 justify-between bg-white shadow-xs bg-indigo-500"
    >
      <div class="ml-8 text-lg text-white hidden md:flex">GregMat GRE</div>
    </div>

    <div class="flex items-center justify-center self-center mx-auto mt-3">
      <div class="inline-block mr-2 mt-1">
        <button
          type="button"
          class="focus:outline-none text-white text-sm py-2.5 px-5 bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
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
          class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500 rounded-l-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
          @click="prevWord"
        >
          Prev. Word
        </button>
        <button
          @click="nextWord"
          class="bg-white text-blue-500 hover:bg-blue-500 hover:text-white border border-l-0 border-blue-500 rounded-r-lg px-4 py-2 mx-0 outline-none focus:shadow-outline"
        >
          Next Word
        </button>
      </div>
      <!-- next prev word -->

      <!-- search box -->
      <div class="inline-block mx-2 mt-2">
        <input
          class="w-full h-11 px-4 rounded-lg mb-0 focus:outline-none focus:shadow-outline text-base shadow-md border border-blue-300"
          type="search"
          placeholder="Search words..."
          v-model="searchquery"
          @keyup.prevent="filterwords"
        />
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
        <small class="text-xs text-gray-600"
          >(set - {{ current_word.set }})</small
        >
      </h2>
    </div>
    <!-- current word meanings -->

    <div class="container mx-auto">
      <div class="flex justify-center">
        <div
          v-for="meaning in current_word.meanings"
          :key="meaning"
          class="shadow-xl px-5 py-4 mx-2 rounded-md"
        >
          <!-- parts of speech -->
          <div class="p-2">
            <div
              class="inline-flex items-center bg-white leading-none text-purple-600 rounded-full shadow text-base"
            >
              <span
                class="inline-flex bg-purple-700 text-white rounded-full h-6 px-3 justify-center items-center"
              >
                {{ meaning.partOfSpeech }}
              </span>
            </div>
          </div>
          <!-- end of parts of speech -->
          <!-- definitions -->
          <div v-for="definition in meaning.definitions" :key="definition">
            <!-- definition -->
            <div class="p-0">
              <div
                class="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm"
              >
                <span
                  class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                >
                  Definition
                </span>
                <span class="inline-flex px-2 text-black">{{
                  definition.definition
                }}</span>
              </div>
            </div>
            <!-- definition -->

            <!-- synonyms -->
            <div class="py-1" v-show="definition.synonyms">
              <div
                class="inline-flex items-center bg-white leading-none text-purple-600 rounded-full my-1 shadow text-teal text-sm"
              >
                <span
                  class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                  >Synonyms</span
                >
              </div>

              <div class="my-1 flex flex-wrap -m-1 max-w-md">
                <span
                  v-for="synoyme in definition.synonyms"
                  :key="synoyme"
                  class="m-1 bg-gray-200 hover:bg-gray-200 rounded-full px-2 font-normal text-base leading-loose"
                  >{{ synoyme }}</span
                >
              </div>
            </div>
            <!-- synonyms -->
            <!-- example -->
            <div class="py-1">
              <div
                class="inline-flex items-center bg-white leading-none text-black-600 rounded-full p-2 shadow text-teal text-sm"
              >
                <span
                  class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center"
                  >Example</span
                >
                <span class="inline-flex px-2">{{ definition.example }}</span>
              </div>
            </div>

            <div v-show="meaning.definitions.length > 1" class="my-1">
              <hr />
            </div>

            <!-- example -->
          </div>
          <!-- end of definitions -->
        </div>
      </div>
    </div>
    <!-- current word meanings -->
    <notifications group="foo" position="bottom right" />
  </div>
</template>

<script>
import words from "./words/words.json";
import axios from "axios";
export default {
  data: function () {
    return {
      words,
      currentWords: null,

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
      ],

      lower_selected: 0,
      current_word: null,
      searchquery: "",
      awaitingSearch: false,
      aaa: null,
    };
  },
  mounted() {
    this.getWords();
    this.currentWords = this.words;
    this.randomWord();
  },
  methods: {
    getWords() {
      console.log("words");
      axios
        .get(
          "https://github.com/Xatta-Trone/gregmat-gre-words/blob/main/src/words/words.json"
        )
        .then((res) => {
          this.aaa = res.data;
          let a = JSON.parse(res.data);
          this.words = res.data;
          console.log(a);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },

    randomWord: function () {
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
      }

      let newset = this.words.filter((word) => {
        return word.set == this.lower_selected;
      });

      if (newset.length > 0) {
        this.currentWords = newset;
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
      // console.log(this.current_word.id);
      if (this.current_word.id - 1 >= 0) {
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
      if (this.current_word.id + 1 <= this.currentWords.length) {
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
};
</script>