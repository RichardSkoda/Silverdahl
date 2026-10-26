<script setup lang="ts">
import {
  contactLimits,
  contactSubjects,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  type ContactStatus,
} from '#shared/contact'

const { t, locale } = useI18n()

const props = withDefaults(
  defineProps<{
    /** Zda je na serveru nastaveno doručování zpráv. */
    deliveryReady: boolean
    /** Výsledek předchozího odeslání bez JavaScriptu (z ?stav=…). */
    initialStatus?: ContactStatus | null
  }>(),
  { initialStatus: null },
)

type FormFields = Omit<ContactPayload, 'locale'>
const form = reactive<FormFields>({ name: '', company: '', email: '', subject: '', message: '' })
const payload = (): ContactPayload => ({ ...form, locale: locale.value })
const honeypot = ref('')
const errors = ref<ContactErrors>({})
const status = ref<ContactStatus | null>(props.initialStatus)
const sending = ref(false)
const hydrated = ref(false)
const statusRef = ref<HTMLElement | null>(null)

// Ve vývoji lze formulář odeslat i bez nastaveného doručování (pro test validace a chybových stavů).
const submitDisabled = computed(() => sending.value || (!props.deliveryReady && !import.meta.dev))

// Texty stavových hlášek jsou v překladech contact.form.status.<stav>.
const statusTone: Record<ContactStatus, 'success' | 'warning' | 'error'> = {
  odeslano: 'success',
  nenapojeno: 'warning',
  chyba: 'error',
  neplatne: 'error',
}

/** Text chybové hlášky pole podle kódu z validace. */
function errorText(field: ContactField): string {
  const code = errors.value[field]
  if (!code) return ''
  const max = field === 'subject' ? 0 : contactLimits[field]
  return t(`contact.form.errors.${field}.${code}`, { max, min: contactLimits.messageMin })
}

const subjectLabel = (subject: string) => (subject === 'other' ? t('contact.form.subjectOther') : subject)

const fieldIds: Record<ContactField, string> = {
  name: 'kontakt-jmeno',
  company: 'kontakt-firma',
  email: 'kontakt-email',
  subject: 'kontakt-predmet',
  message: 'kontakt-zprava',
}

onMounted(() => {
  hydrated.value = true
})

function validateField(field: ContactField) {
  if (!(field in errors.value)) return
  const fieldError = validateContact(payload())[field]
  if (fieldError) errors.value[field] = fieldError
  else delete errors.value[field]
}

async function showStatus(next: ContactStatus) {
  status.value = next
  await nextTick()
  statusRef.value?.focus()
}

async function onSubmit() {
  status.value = null
  errors.value = validateContact(payload())

  const firstInvalid = (Object.keys(fieldIds) as ContactField[]).find((field) => errors.value[field])
  if (firstInvalid) {
    await nextTick()
    document.getElementById(fieldIds[firstInvalid])?.focus()
    return
  }

  sending.value = true
  try {
    const response = await $fetch<{ status: ContactStatus }>('/api/contact', {
      method: 'POST',
      body: { ...payload(), website: honeypot.value },
    })
    if (response.status === 'odeslano') {
      Object.assign(form, { name: '', company: '', email: '', subject: '', message: '' })
    }
    await showStatus(response.status)
  } catch (error: unknown) {
    const data = (error as { data?: { status?: ContactStatus; errors?: ContactErrors } }).data
    if (data?.errors) errors.value = data.errors
    await showStatus(data?.status ?? 'chyba')
  } finally {
    sending.value = false
  }
}

const describedBy = (field: ContactField, hint?: string) =>
  [hint, errors.value[field] ? `${fieldIds[field]}-chyba` : null].filter(Boolean).join(' ') || undefined
</script>

<template>
  <form
    id="formular"
    class="form"
    method="post"
    action="/api/contact"
    :novalidate="hydrated"
    aria-labelledby="formular-nadpis"
    @submit.prevent="onSubmit"
  >
    <h2 id="formular-nadpis" class="form__title">{{ $t('contact.form.title') }}</h2>

    <!-- Jazyk formuláře – pro přesměrování zpět na správnou jazykovou verzi při odeslání bez JavaScriptu. -->
    <input type="hidden" name="locale" :value="locale">

    <div v-if="!deliveryReady" class="notice notice--warning" role="note">
      <strong>{{ $t('contact.form.notConfiguredTitle') }}</strong>
      {{ $t('contact.form.notConfiguredText') }}
    </div>

    <div v-if="status" ref="statusRef" class="notice" :class="`notice--${statusTone[status]}`" role="status" tabindex="-1">
      <strong>{{ $t(`contact.form.status.${status}.title`) }}</strong>
      {{ $t(`contact.form.status.${status}.text`) }}
    </div>

    <i18n-t keypath="contact.form.requiredHint" tag="p" class="form__hint" scope="global">
      <template #star>
        <span aria-hidden="true">*</span><span class="visually-hidden">{{ $t('contact.form.requiredStar') }}</span>
      </template>
    </i18n-t>

    <div class="form__row">
      <div class="field" :class="{ 'field--invalid': errors.name }">
        <label :for="fieldIds.name">{{ $t('contact.form.name') }} <span aria-hidden="true">*</span></label>
        <input
          :id="fieldIds.name"
          v-model="form.name"
          name="name"
          type="text"
          autocomplete="name"
          required
          :maxlength="contactLimits.name"
          :aria-invalid="errors.name ? 'true' : undefined"
          :aria-describedby="describedBy('name')"
          @blur="validateField('name')"
        >
        <p v-if="errors.name" :id="`${fieldIds.name}-chyba`" class="field__error">{{ errorText('name') }}</p>
      </div>

      <div class="field" :class="{ 'field--invalid': errors.company }">
        <label :for="fieldIds.company">
          {{ $t('contact.form.company') }} <span class="field__optional">{{ $t('contact.form.optional') }}</span>
        </label>
        <input
          :id="fieldIds.company"
          v-model="form.company"
          name="company"
          type="text"
          autocomplete="organization"
          :maxlength="contactLimits.company"
          :aria-invalid="errors.company ? 'true' : undefined"
          :aria-describedby="describedBy('company')"
        >
        <p v-if="errors.company" :id="`${fieldIds.company}-chyba`" class="field__error">{{ errorText('company') }}</p>
      </div>
    </div>

    <div class="form__row">
      <div class="field" :class="{ 'field--invalid': errors.email }">
        <label :for="fieldIds.email">{{ $t('contact.form.email') }} <span aria-hidden="true">*</span></label>
        <input
          :id="fieldIds.email"
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          inputmode="email"
          required
          :maxlength="contactLimits.email"
          :aria-invalid="errors.email ? 'true' : undefined"
          :aria-describedby="describedBy('email')"
          @blur="validateField('email')"
        >
        <p v-if="errors.email" :id="`${fieldIds.email}-chyba`" class="field__error">{{ errorText('email') }}</p>
      </div>

      <div class="field" :class="{ 'field--invalid': errors.subject }">
        <label :for="fieldIds.subject">{{ $t('contact.form.subject') }} <span aria-hidden="true">*</span></label>
        <select
          :id="fieldIds.subject"
          v-model="form.subject"
          name="subject"
          required
          :aria-invalid="errors.subject ? 'true' : undefined"
          :aria-describedby="describedBy('subject')"
          @change="validateField('subject')"
        >
          <option value="" disabled>{{ $t('contact.form.subjectPlaceholder') }}</option>
          <option v-for="subject in contactSubjects" :key="subject" :value="subject">{{ subjectLabel(subject) }}</option>
        </select>
        <p v-if="errors.subject" :id="`${fieldIds.subject}-chyba`" class="field__error">{{ errorText('subject') }}</p>
      </div>
    </div>

    <div class="field" :class="{ 'field--invalid': errors.message }">
      <label :for="fieldIds.message">{{ $t('contact.form.message') }} <span aria-hidden="true">*</span></label>
      <textarea
        :id="fieldIds.message"
        v-model="form.message"
        name="message"
        rows="6"
        required
        :minlength="contactLimits.messageMin"
        :maxlength="contactLimits.message"
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="describedBy('message')"
        @blur="validateField('message')"
      />
      <p v-if="errors.message" :id="`${fieldIds.message}-chyba`" class="field__error">{{ errorText('message') }}</p>
    </div>

    <!-- Antispam: pole je skryté pro lidi i asistivní technologie. -->
    <div class="form__trap" aria-hidden="true">
      <label for="kontakt-web">Web</label>
      <input id="kontakt-web" v-model="honeypot" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>

    <!-- TODO: Doplnit informaci o zpracování osobních údajů (odkaz na zásady ochrany osobních údajů), až bude k dispozici. -->

    <div class="form__actions">
      <BaseButton type="submit" :disabled="submitDisabled">
        {{ sending ? $t('contact.form.sending') : $t('contact.form.submit') }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  gap: var(--space-5);
  padding: clamp(1.25rem, 0.8rem + 2vw, 2.5rem);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
}

.form__title {
  font-size: var(--text-2xl);
}

.form__hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.form__row {
  display: grid;
  gap: var(--space-5);
}

@media (min-width: 40rem) {
  .form__row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.field {
  display: grid;
  gap: var(--space-2);
  align-content: start;
}

.field label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-navy-800);
}

.field__optional {
  font-weight: 400;
  color: var(--color-text-muted);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 3rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 1rem;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.field textarea {
  resize: vertical;
  min-height: 9rem;
}

.field input:hover,
.field select:hover,
.field textarea:hover {
  border-color: var(--color-navy-600);
}

.field input:focus-visible,
.field select:focus-visible,
.field textarea:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 1px;
  border-color: var(--color-navy-700);
}

.field--invalid input,
.field--invalid select,
.field--invalid textarea {
  border-color: var(--color-error);
}

.field__error {
  font-size: var(--text-sm);
  color: var(--color-error);
}

.form__trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form__actions {
  display: flex;
  justify-content: flex-start;
}

.notice {
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  border-left: 4px solid;
  font-size: var(--text-sm);
}

.notice strong {
  display: block;
  margin-bottom: var(--space-1);
}

.notice:focus {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.notice--success {
  background: var(--color-success-bg);
  border-color: var(--color-success);
  color: var(--color-success);
}

.notice--warning {
  background: var(--color-warning-bg);
  border-color: var(--color-accent);
  color: var(--color-warning);
}

.notice--error {
  background: var(--color-error-bg);
  border-color: var(--color-error);
  color: var(--color-error);
}
</style>
