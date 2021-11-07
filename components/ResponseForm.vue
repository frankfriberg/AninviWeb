<template>
  <form class="px-8" @submit.prevent="handleSubmit">
    <h2>{{ $tc('form.names', input.persons.length) }}</h2>
    <div v-for="(person, index) in input.persons" :key="index">
      <FormString
        :required="true"
        :id="index"
        :input="person.name"
        :key="index"
        v-model="person.name"
        class="inline-block"
      />
      <span
        v-if="input.persons.length > 1"
        class="mt-2 h-full cursor-pointer bg-red-500 inline appearance-none  rounded border border-black py-2 px-1 leading-tight focus:outline-none focus:shaodw-outline hover:bg-red-400 bold"
        :key="index + 'button'"
        @click="removePerson(index)"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 25 30"
          class="inline-block w-6 h-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path></svg
      ></span>
    </div>

    <span
      class="button cursor-pointer mt-5 mb-3"
      @click="addPerson"
      v-t="'form.add'"
    ></span>

    <FormBoolean
      :label="$tc('form.attending', input.persons.length)"
      id="attendance"
      :required="true"
      v-model="input.attending"
    />

    <div v-if="input.attending === true || input.attending">
      <template v-for="(person, index) in input.persons">
        <FormCheckbox
          :label="
            $tc('form.allergy', input.persons.length, { name: person.name })
          "
          :options="allergies"
          :translated="allergiesTranslated"
          :key="index + 'allergies'"
          v-model="person.allergy"
          :id="index + 'allergies'"
        />
        <FormString
          v-if="person.allergy.includes('other')"
          v-model="person.allergy[5]"
          :label="$tc('form.other')"
          :key="index + 'otherAllergy'"
          :id="index + 'allergiesOther'"
        />
      </template>

      <compenent
        v-for="question in questions"
        :is="'form-' + question.type"
        :key="question._id"
        :id="question._id"
        :options="question.options"
        :label="question.label[$i18n.locale]"
        v-model="input.other[question._id]"
      />
    </div>

    <p v-if="error" class="p-3 bg-orange-200 font-bold rounded-md">
      {{ $t('form.error') }}
    </p>

    <input
      class="button uppercase mt-6 mb-12"
      role="button"
      type="submit"
      :value="$t('send')"
      :disabled="sent"
    />
  </form>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sent: false,
      error: false,
      allergies: ['lactose', 'nuts', 'fish', 'gluten', 'other'],
      input: {
        persons: [
          {
            name: '',
            allergy: [],
          },
        ],
        attending: '',
        other: {},
      },
    }
  },
  mounted: function() {
    if (this.$route.query.names !== undefined) {
      let names = this.$route.query.names.split(' & ')
      this.input.names = names
    }

    this.input.clientId = this.$store.getters['client']._id
  },
  methods: {
    addPerson() {
      this.input.persons.push({
        name: '',
        allergy: [],
      })
    },
    removePerson(index) {
      this.input.persons.splice(index, 1)
    },
    handleSubmit() {
      // this.sent = true;
      axios
        .post('/api/v3/guest', {
          input: this.input,
        })
        .then((response) => {
          if (response.status === 201) {
            this.$router.push(this.localePath('client-thanks'))
          } else {
            this.error = true
          }
        })
        .catch((error) => {
          this.error = true
          console.error(error.response)
        })
    },
  },
  computed: {
    allergiesTranslated: function() {
      let translated = []
      this.allergies.forEach((allergy, index) => {
        translated[index] = this.$t('form.allergies.' + allergy)
      })
      return translated
    },
  },
}
</script>

<style></style>
