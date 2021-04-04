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
          class="w-full h-11 px-4 rounded-lg mb-0 focus:outline-none focus:shadow-outline text-base shadow-md border border-indigo-300"
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
          v-for="(meaning, i) in current_word.meanings"
          :key="i"
          class="shadow-xl px-5 py-4 mx-2 rounded-md"
        >
          <!-- parts of speech -->
          <div class="p-2">
            <div
              class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full shadow text-base"
            >
              <span
                class="inline-flex bg-indigo-700 text-white rounded-full h-6 px-3 justify-center items-center"
              >
                {{ meaning.partOfSpeech }}
              </span>
            </div>
          </div>
          <!-- end of parts of speech -->
          <!-- definitions -->
          <div v-for="(definition, j) in .definitions" :key="j">
            <!-- definition -->
            <div class="p-0">
              <div
                class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full p-2 shadow text-teal text-sm"
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
                class="inline-flex items-center bg-white leading-none text-indigo-600 rounded-full my-1 shadow text-teal text-sm"
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
    <!-- footer  -->

    <div class="pt-2">
      <div
        class="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-400 text-sm flex-col md:flex-row max-w-6xl"
      >
        <div class="mt-2">
          Made with ❤ for GregMat by
          <a href="https://github.com/Xatta-Trone/" target="_blank"
            >Xatta Trone</a
          >
        </div>
      </div>
    </div>
    <notifications group="foo" position="bottom right" />
  </div>
</template>
