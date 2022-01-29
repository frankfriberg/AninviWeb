<template>
  <div>
    <h1>{{ event.title }}</h1>
    <NuxtLink :to="{ name: 'user-event-settings' }">Event Settings</NuxtLink>
    <FormRadio
      v-model="filter.attending"
      :options="['All', 'Yes', 'No']"
      id="attending"
      label="Attending"
    />
    <FormCheckbox
      v-model="filter.allergies"
      id="allergiesFilter"
      :options="allergiesTranslated"
    />
    <FormString type="text" v-model="filter.search" placeholder="Search" />
    <table>
      <thead>
        <tr>
          <th>{{ $t('table.name') }}</th>
          <th>{{ $t('table.allergies') }}</th>
          <th v-for="question in event.questions" :key="question._id">
            {{ question.label[$i18n.locale] }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="guest in filteredGuests">
          <tr
            v-if="guestEdit._id !== guest._id"
            :class="{ 'bg-red-300': !guest.attending }"
            :key="guest._id"
            @click="editGuest(guest)"
          >
            <td>{{ guest.name }}</td>
            <td>
              <template v-for="(boolean, allergy) in guest.allergies">
                <span class="allergy" v-if="boolean" :key="guest._id + allergy">
                  {{ $t('form.allergies.' + allergy) }}
                </span>
              </template>
              <template v-for="(other, otherAllergy) in guest.otherAllergy">
                <span
                  class="other"
                  v-if="other"
                  :key="guest._id + otherAllergy"
                >
                  {{ other }}
                </span>
              </template>
            </td>
            <td v-for="question in event.questions" :key="question._id">
              <span v-if="guest.answers[question._id]">
                {{ guest.answers[question._id] }}
              </span>
            </td>
          </tr>

          <tr v-else :key="`edit_${guest._id}`">
            <FormBoolean v-model="guestEdit.attending" id="attending" />
            <FormString v-model="guestEdit.name" id="name" placeholder="Name" />
            <FormCheckbox
              v-model="guestEdit.allergies"
              id="allergies"
              :options="allergies"
            />
            <template v-for="question in event.questions">
              <FormString
                :key="question._id"
                v-model="guestEdit.answers[question._id]"
                id="answer"
                placeholder="Answer"
              />
            </template>
            <button class="bg-green-300" @click="saveGuest">Save</button>
            <button class="bg-red-300" @click="cancelGuest">Cancel</button>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Event } from '~/../api/types/event.types'
import { Guest } from '~/../api/types/guest.types'

@Component({
  middleware: ['auth', 'verification'],
  layout: 'user',
})
export default class UserIndex extends Vue {
  allergies = ['lactose', 'gluten', 'fish', 'nuts', 'other']
  guests: Array<Guest> = this.$store.getters.guests
  event: Event = this.$store.getters.event
  filter = {
    search: '' as String,
    allergies: [false, false, false, false] as Array<boolean>,
    attending: 'All',
  }
  guestEdit = {
    _id: '',
    name: '',
    attending: false,
    allergies: [] as Boolean[],
    answers: [] as string[],
  }

  get filteredGuests() {
    return this.filterAttending(
      this.searchedGuests(this.filterAllergies(this.guests))
    )
  }
  get allergiesTranslated() {
    let allergies = ['lactose', 'nuts', 'fish', 'gluten', 'other']
    let translated: Array<string> = []
    allergies.forEach((allergy, index) => {
      translated[index] = this.$t('form.allergies.' + allergy).toString()
    })
    return translated
  }

  searchedGuests(guests: Array<Guest>) {
    return guests.filter((guest) =>
      guest.name.toLowerCase().includes(this.filter.search.toLowerCase())
    )
  }

  filterAllergies(guests: Array<Guest>) {
    return guests.filter((guest) => {
      return Object.values(guest.allergies).every((allergy, i) =>
        this.filter.allergies[i] ? allergy : true
      )
    })
  }

  filterAttending(guests: Array<Guest>) {
    return guests.filter((guest) => {
      if (this.filter.attending === 'All') return true
      if (this.filter.attending === 'Yes') return guest.attending === true
      if (this.filter.attending === 'No') return guest.attending === false
    })
  }

  editGuest(guest: Guest) {
    this.guestEdit = {
      _id: guest._id,
      name: guest.name,
      attending: guest.attending,
      allergies: Object.values(guest.allergies),
      answers: Object.values(guest.answers),
    }
  }

  cancelGuest() {
    this.guestEdit = {
      _id: '',
      name: '',
      attending: false,
      allergies: [],
      answers: [],
    }
  }

  saveGuest() {
    this.$store.dispatch('updateGuest', this.guestEdit)
  }

  deleteGuest() {
    this.$store.dispatch('deleteGuest', this.guestEdit._id)
  }

  beforeMount() {
    this.$store
      .dispatch('getGuestsByEventId', {
        eventId: this.event._id,
        token: this.$auth.user.token,
      })
      .then((guests: Guest[]) => (this.guests = guests))
      .catch((error) => console.log(error))
  }
}
</script>
