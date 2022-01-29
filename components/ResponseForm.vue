<template>
  <form class="px-8" @submit.prevent="handleSubmit">
    <h2>{{ $tc('form.names', input.persons.length) }}</h2>
    <div v-for="(person, index) in input.persons" :key="'person' + index">
      <FormString
        :required="true"
        :id="index"
        :input="person.name"
        :key="'personString' + index"
        v-model="person.name"
        class="inline-block"
      />
      <span
        v-if="input.persons.length > 1"
        class="inline h-full px-1 py-2 mt-2 leading-tight bg-red-500 border border-black rounded appearance-none cursor-pointer focus:outline-none focus:shaodw-outline hover:bg-red-400 bold"
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
      class="mt-5 mb-3 cursor-pointer button"
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
          :options="allergiesTranslated"
          :key="index + 'allergies'"
          v-model="person.allergy"
          :id="index + 'allergies'"
        />
        <FormString
          v-if="person.allergy[4]"
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
        v-model="input.questions[question._id]"
      />
    </div>

    <p v-if="error" class="p-3 font-bold bg-orange-200 rounded-md">
      {{ $t('form.error') }}
    </p>

    <input
      class="mt-6 mb-12 uppercase button"
      role="button"
      type="submit"
      :value="$t('send')"
      :disabled="sent"
    />
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { QuestionTypes } from '~/../api/types/event.types'

interface Questions {
  type: QuestionTypes
  label: {
    [language: string]: string
  }
  options?: Array<String>
}

@Component
export default class FormResponse extends Vue {
  @Prop({ type: Array, required: true }) questions!: Questions
  @Prop({ type: String, required: true }) eventId!: string

  sent = false
  error = false
  input = {
    persons: [{ name: '', allergy: [] }],
    attending: false,
    questions: {},
  }

  addPerson() {
    this.input.persons.push({
      name: '',
      allergy: [],
    })
  }

  removePerson(index: number) {
    this.input.persons.splice(index, 1)
  }

  handleSubmit() {
    this.sent = true
    let formattedInput: Array<object> = []

    for (const person of this.input.persons) {
      formattedInput.push({
        event: this.eventId,
        name: person.name,
        attending: this.input.attending,
        allergies: person.allergy,
        questions: this.input.questions,
      })
    }

    this.$axios
      .post('/guest', formattedInput)
      .then((response) => {
        if (response.status === 201) {
          console.log(response)
        } else {
          this.error = true
        }
      })
      .catch((error) => {
        this.error = error
        console.error(error.response)
      })
  }

  get allergiesTranslated() {
    let allergies = ['lactose', 'nuts', 'fish', 'gluten', 'other']
    let translated: Array<string> = []
    allergies.forEach((allergy, index) => {
      translated[index] = this.$t('form.allergies.' + allergy).toString()
    })
    return translated
  }
}
</script>

<style></style>
