<template>
  <div>
    <form action="">
      <FormString
        v-model="eventEdit.title"
        id="title"
        placeholder="Title"
        label="Event Title"
      />
      <FormString
        v-model="eventEdit.slug"
        id="slug"
        placeholder="Slug"
        label="Event Slug"
      />
      <label for="date">Date</label>

      <input
        type="datetime-local"
        id="date"
        name="date"
        v-model="eventEdit.date"
      />
      <span>Questions</span>

      <div class="flex">
        <button
          class="px-4 py-2 mr-5 font-semibold text-blue-700 bg-blue-200 border border-blue-700 rounded hover:bg-blue-300"
          type="button"
          @click="addQuestion(question.type)"
          v-for="question in questionTypes"
          :key="question.type"
        >
          {{ question.type }}
        </button>
      </div>

      <ul>
        <template v-if="eventEdit.questions != 0">
          <li
            v-for="(question, questionIndex) in eventEdit.questions"
            :key="question._id"
          >
            <button type="button" @click="removeQuestion(questionIndex)">
              Remove Question
            </button>
            <label for="questionType">Type</label>
            <select
              name="questionType"
              id="questionType"
              v-model="question.type"
            >
              <option value="text">Text</option>
              <option value="radio">Radio</option>
              <option value="boolean">Yes / No</option>
              <option value="checkbox">Checkbox</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="select">Select</option>
            </select>
            <div>
              <label class="block" for="questionLabel">Label</label>
              <FormString
                class="inline-block"
                v-model="question.label"
                id="questionLabel"
                placeholder="Label"
              />

              <ul
                v-if="
                  question.type == 'checkbox' ||
                  question.type == 'select' ||
                  question.type == 'radio'
                "
              >
                <h3>Options</h3>
                <button type="button" @click="addOption(questionIndex)">
                  Add Option
                </button>

                <li
                  v-for="(option, optionIndex) in question.options"
                  :key="option._id"
                >
                  <span>Option {{ optionIndex + 1 }}</span>
                  <button
                    type="button"
                    @click="removeOption(questionIndex, optionIndex)"
                  >
                    Remove Option
                  </button>
                  <FormString
                    :key="option + optionIndex"
                    v-model="question.options[optionIndex]"
                    id="optionLabel"
                    placeholder="Option"
                  />
                </li>
              </ul>
            </div>
          </li>
        </template>
      </ul>
    </form>
    {{ eventEdit }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import type { Event } from '../../../../api/types/event.types'

@Component({
  middleware: ['auth', 'verification'],
  layout: 'user',
})
export default class UserIndex extends Vue {
  questionTypes = [
    {
      type: 'text',
      icon: 'type',
    },
    {
      type: 'radio',
      icon: '',
    },
    {
      type: 'boolean',
      icon: '',
    },
    {
      type: 'checkbox',
      icon: '',
    },
    {
      type: 'number',
      icon: '',
    },
    {
      type: 'date',
      icon: '',
    },
    {
      type: 'time',
      icon: '',
    },
    {
      type: 'select',
      icon: '',
    },
  ]
  event: Event = JSON.parse(JSON.stringify(this.$store.getters.event))
  eventEdit = {
    title: this.event.title,
    slug: this.event.slug,
    date: new Date(this.event.date).toISOString().substring(0, 16),
    adress: this.event.adress,
    questions: this.event.questions?.map((question) => {
      return {
        type: question.type,
        label: question.label[this.$i18n.locale],
        options: question.options?.map((option) => option[this.$i18n.locale]),
      }
    }),
  }

  addQuestion(type: string) {
    if (this.eventEdit.questions) {
      this.eventEdit.questions.push({
        type: type,
        label: '',
        options: [],
      })
    }
  }

  removeQuestion(index: number) {
    this.eventEdit.questions?.splice(index, 1)
  }

  addOption(index: number) {
    if (this.eventEdit.questions) {
      if (this.eventEdit.questions[index].options) {
        this.eventEdit.questions[index].options?.push('')
      } else {
        Vue.set(this.eventEdit.questions[index], 'options', [''])
      }
    }
  }

  removeOption(questionIndex: number, optionIndex: number) {
    if (this.eventEdit.questions) {
      this.eventEdit.questions[questionIndex].options?.splice(optionIndex, 1)
    }
  }
}
</script>

<style></style>
